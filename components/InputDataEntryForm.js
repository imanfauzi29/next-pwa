import React, { useRef, useState } from 'react'
import { AsyncTypeahead, Hint } from 'react-bootstrap-typeahead'
import onClickOutside from 'react-onclickoutside'

import 'react-bootstrap-typeahead/css/Typeahead.css'
import { Form } from 'react-bootstrap'


const InputDataEntryForm = (props) => {
  const [searchQuery, setSearchQuery] = useState(props.defaultValue)
  const [selected, setSelected] = useState([])
  const [options, setOptions] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef()

  const getSuggestion = (values) => {
    let value = ''
    if (values.length > 0) {
      value = values
      // let URL = `http://926635e829bf.ngrok.io/v1/dictionary?search=${query}`
      // axios.get(URL)
      // .then(res => res.data)
      // .then(data => option = data.data)
      option.push(values)
    }
    setOptions(value)
  }

  const update = () => {
    props.onUpdate(searchQuery)
  }

  const onKeyDown = event => {
    if (event.code == 'Tab') {
      update()
    }
  }

  InputDataEntryForm.handleClickOutside = () => {
    if (ref.current === undefined) return props.onUpdate(searchQuery)

    let value = ''
    if (typeof ref.current.props !== 'undefined') {
      value = ref.current.props.defaultInputValue
    }else {
      value = ref.current.value
    }

    props.onUpdate(value)
    let column = localStorage.getItem('__curent_cols')
    if (column !== null || undefined) localStorage.removeItem('__curent_cols')
  }

  const getInput = (type) => {
    console.log(type);
    switch (type) {
      case 'dictionary':
        return (
          <AsyncTypeahead
            ref={ref}
            id="form-example"
            isLoading={false}
            allowNew
            className={"w-100"}
            options={options}
            defaultInputValue={searchQuery}
            onInputChange={(query) => setSearchQuery(query)}
            onChange={([query]) => update()}
            onKeyDown={onKeyDown}
            onSearch={getSuggestion}
            selected={selected}>
              
            {(state) => setActiveIndex(state.activeIndex)}
          </AsyncTypeahead>
        )
    
      default:
        return (
          <Form.Group className="m-0">
            <Form.Control 
              ref={ref}
              className={"w-100"}
              style={{height: "initial", padding: "0"}}
              onKeyDown={onKeyDown}
              onChange={(query) => {
                let value = query.target.value
                setSearchQuery(value)
              }}
              value={searchQuery} />
          </Form.Group>
        )
    }
  }

  return (
    getInput(props.type)
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => InputDataEntryForm.handleClickOutside
};

export default onClickOutside(InputDataEntryForm, clickOutsideConfig)

