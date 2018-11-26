import '../scss/main.scss';
import React from 'react';
import Map from '../js/map/map.js';
import { areEqual } from '../js/data/utilities.js';

class Viewport extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const domain = {
      locations: this.props.locations,
      narratives: this.props.narratives,
      sites: this.props.sites,
      categoryGroups: this.props.categoryGroups
    }
    const app = {
      views: this.props.views,
      selected: this.props.selected,
      highlighted: this.props.highlighted,
      getCategoryGroup: this.props.getCategoryGroup,
      getCategoryGroupColor: this.props.getCategoryGroupColor,
      select: this.props.select,
      mapAnchor: this.props.mapAnchor
    }

    this.map = new Map(app, this.props.ui);
    this.map.update(domain, app);
  }

  componentWillReceiveProps(nextProps) {
    const domain = {
      locations: nextProps.locations,
      narratives: nextProps.narratives,
      sites: nextProps.sites,
      categoryGroups: nextProps.categoryGroups
    }
    const app = {
      views: nextProps.views,
      selected: nextProps.selected,
      highlighted: nextProps.highlighted,
      getCategoryGroup: nextProps.getCategoryGroup,
      getCategoryGroupColor: nextProps.getCategoryGroupColor,
      mapAnchor: this.props.mapAnchor
    }

    this.map.update(domain, app);
  }

  render() {
    return (
      <div className='map-wrapper'>
        <div id="map" />
      </div>
    );
  }
}

export default Viewport;
