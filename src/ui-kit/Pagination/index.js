// @flow
import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

type $props = {
  minSize: number,
  loadMore: Function,
};

class Pagination extends PureComponent {
  props: Object;
  render() {
    return (
      <InfiniteScroll
        initialLoad={false}
        threshold={100}
        pageStart={0}
        loadMore={this.props.loadMore}
        hasMore={this.props.hasMore}
        loader={<div className="loader">Loading ...</div>}
      >
        {this.props.children}
      </InfiniteScroll>
    );
  }
}

export default class PaginationWrapper extends PureComponent {
  state = {
    hasMore: true,
  };
  props: $props;
  handleLoadMore = (page: number) => {
    this.props.loadMore(page).then(results => {
      if (results.length < this.props.minSize) {
        this.setState({
          hasMore: false,
        });
      }
    });
  };
  render() {
    return (
      <Pagination
        {...this.props}
        hasMore={this.state.hasMore}
        loadMore={this.handleLoadMore}
      />
    );
  }
}
