import React from 'react';
import PropTypes from 'prop-types';



class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //selectedOrg: {}
    };
    //this.setSelectedOrgState = this.setSelectedOrgState.bind(this);
  }
//{ pagination.prev.disabled ? disabled : '' }>
  render() {
    const pagination = this.props;
    return(
      <div className="ma__pagination js-pagination">
        <div className="ma__pagination__container">
          <button
            className="ma__pagination__prev js-pagination-prev"
            type="button"
            disabled={pagination.prev.disabled}>
            {pagination.prev.text}
          </button>
          { pagination.pages.map(page => (
            page.text == "spacer" ?
               <span className="ma__pagination__spacer">&hellip;</span> :
               <button
                className={page.active ? 'ma__pagination__page js-pagination-page is-active' : 'ma__pagination__page js-pagination-page' }
                type="button"
                data-page={page.text}>
                {page.text}
               </button>
          ))}
        <button className="ma__pagination__next js-pagination-next" type="button"
          disabled={pagination.next.disabled}>
          {pagination.next.text}
        </button>
      </div>
    </div>
    );
  }
};

Pagination.propTypes = {
  next: PropTypes.shape({
    disabled: PropTypes.boolean,
    text: PropTypes.string.isRequired
  }),
  prev: PropTypes.shape({
    disabled: PropTypes.boolean,
    text: PropTypes.string.isRequired
  }),
  pages: PropTypes.shape({
    active: PropTypes.boolean,
    text: PropTypes.string.isRequired
  })
};

export default Pagination;
