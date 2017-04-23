import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import config from './../../config'
import { invokeApig, s3Upload } from '../../libs/awsLib'
import './Notes.css'

import { LoaderButton } from './../../components/index'

class Notes extends Component {
  state = {
    isLoading: null,
    isDeleting: null,
    note: null,
    content: ''
  };

  file = null;

  async componentDidMount () {
    try {
      const results = await this.getNote()
      if (results.error) {
        this.props.history.push('/')
      } else {
        this.setState({
          note: results,
          content: results.content
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  getNote () {
    return invokeApig(
      {
        path: `/notes/${this.props.match.params.id}`
      },
      this.props.userToken
    )
  }

  validateForm () {
    return this.state.content.length > 0
  }

  formatFilename (str) {
    return str.length < 50
      ? str
      : str.substr(0, 20) + '...' + str.substr(str.length - 20, str.length)
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  handleFileChange = event => {
    this.file = event.target.files[0]
  };

  saveNote (note) {
    return invokeApig(
      {
        path: `/notes/${this.props.match.params.id}`,
        method: 'PUT',
        body: note
      },
      this.props.userToken
    )
  }

  handleSubmit = async event => {
    let uploadedFilename

    event.preventDefault()

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert('Please pick a file smaller than 5MB')
      return
    }

    this.setState({ isLoading: true })

    try {
      if (this.file) {
        console.log(this.file)
        uploadedFilename = await s3Upload(this.file, this.props.userToken)
      }

      await this.saveNote({
        ...this.state.note,
        content: this.state.content,
        attachment: uploadedFilename || this.state.note.attachment
      })
      this.props.history.push('/')
    } catch (e) {
      console.error(e)
      this.setState({ isLoading: false })
    }
  };

  deleteNote () {
    return invokeApig(
      {
        path: `/notes/${this.props.match.params.id}`,
        method: 'DELETE'
      },
      this.props.userToken
    )
  }

  handleDelete = async event => {
    event.preventDefault()

    const confirmed = confirm('Are you sure you want to delete this note?')

    if (confirmed) {
      this.setState({ isDeleting: true })
    }

    try {
      await this.deleteNote()
      this.props.history.push('/')
    } catch (e) {
      console.error(e)
      this.setState({ isDeleting: false })
    }
  };

  render () {
    return (
      <div className='Notes'>
        {this.state.note &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId='content'>
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass='textarea'
              />
            </FormGroup>
            {this.state.note.attachment &&
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a target='_blank' href={this.state.note.attachment}>
                    {this.formatFilename(this.state.note.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>}
            <FormGroup controlId='file'>
              {!this.state.note.attachment &&
                <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type='file' />
            </FormGroup>
            <LoaderButton
              block
              bsStyle='primary'
              bsSize='large'
              disabled={!this.validateForm()}
              type='submit'
              isLoading={this.state.isLoading}
              text='Save'
              loadingText='Saving…'
            />
            <LoaderButton
              block
              bsStyle='danger'
              bsSize='large'
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text='Delete'
              loadingText='Deleting…'
            />
          </form>}
      </div>
    )
  }
}

export default withRouter(Notes)
