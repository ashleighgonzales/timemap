import React from 'react'
import Checkbox from './presentational/Checkbox'
import copy from '../js/data/copy.json'

class TagListPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      treeComponents: []
    }
    this.treeComponents = []
    this.newTagFilters = []
  }

  componentDidMount () {
    this.computeTree(this.props.tags)// .children[this.props.tagType]);
  }

  componentWillReceiveProps (nextProps) {
    this.computeTree(nextProps.tags)// .children[nextProps.tagType]);
  }

  onClickCheckbox (obj, type) {
    obj.active = !obj.active
    this.props.onTagFilter(obj)
  }

  createNodeComponent (node, depth) {
    return (
      <li
        key={node.key.replace(/ /g, '_')}
        className={'tag-filter active'}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <Checkbox
          label={node.key}
          isActive={node.active}
          onClickCheckbox={() => this.onClickCheckbox(node, 'tag')}
        />
      </li>
    )
  }

  traverseNodeAndCreateComponent (node, depth) {
    // add and create node component
    const newComponent = this.createNodeComponent(node, depth)
    this.treeComponents.push(newComponent)
    depth = depth + 1
    if (Object.keys(node.children).length > 0) {
      Object.values(node.children).forEach((childNode) => {
        this.traverseNodeAndCreateComponent(childNode, depth)
      })
    }
  }

  computeTree (node) {
    this.treeComponents = []
    let depth = 0
    this.traverseNodeAndCreateComponent(node, depth)
    this.setState({ treeComponents: this.treeComponents })
  }

  renderTree () {
    return (
      <div>
        {this.state.treeComponents.map(c => c)}
      </div>
    )
  }

  render () {
    return (
      <div className='react-innertabpanel'>
        <h2>{copy[this.props.language].toolbar.tags}</h2>
        <p>{copy[this.props.language].toolbar.explore_by_tag__description}</p>
        {this.renderTree()}
      </div>
    )
  }
}

export default TagListPanel