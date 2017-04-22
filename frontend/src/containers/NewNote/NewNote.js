import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import { LoaderButton } from '../../components/index'

import { invokeApig, s3Upload } from '../../libs/awsLib'
import config from '../../config.js'
import './NewNote.css'

class NewNote extends Component {
  state = {
    isLoading: null,
    content: ''
  };

  file = null;

  validateForm () {
    return this.state.content.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  };

  handleFileChange = event => {
    this.file = event.target.files[0]
  };

  handleSubmit = async event => {
    event.preventDefault()

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert('File size must be smaller than 5mb')
      return
    }

    this.setState({ isLoading: true })

    try {
      const uploadFilename = this.file
        ? await s3Upload(this.file, this.props.userToken)
        : null

      await this.createNote({
        content: this.state.content,
        attachment: uploadFilename
      })
      this.props.history.push('/')
    } catch (e) {
      console.error(e)
      this.setState({ isLoading: false })
    }
  };

  createNote (note) {
    return invokeApig(
      {
        path: '/notes',
        method: 'POST',
        body: note
      },
      this.props.userToken
    )
  }

  render () {
    return (
      <div className='NewNote'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='content'>
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass='textarea'
            />
          </FormGroup>
          <FormGroup controlId='file'>
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type='file' />
          </FormGroup>
          <LoaderButton
            block
            bsStyle='primary'
            bsSize='large'
            disabled={!this.validateForm()}
            type='submit'
            isLoading={this.state.isLoading}
            text='Create'
            loadingText='Creating…'
          />
        </form>
      </div>
    )
  }
}

export default withRouter(NewNote)
