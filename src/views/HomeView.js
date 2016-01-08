import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router'
import { actions as counterActions } from '../redux/modules/counter'
import styles from './HomeView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class HomeView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <Row center='xs'>
        <Col>
          <h1>Welcome to the React Redux Starter Kit</h1>
          <h2>
            Sample Counter:&nbsp;
            <span className={styles['counter--green']}>{this.props.counter}</span>
          </h2>
          <Button raised accent onClick={() => this.props.increment(1)}>
            Increment
          </Button>
          <Button primary onClick={this.props.doubleAsync}>
            Double (Async)
          </Button>
          <hr />
          <Link to='/about'>Go To About View</Link>
          <hr />
          <Link to='/torrents'>Go To Torrent List View</Link>
        </Col>
      </Row>
    )
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)
