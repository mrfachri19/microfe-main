import React, { Component } from "react";
import ReactGA from "react-ga";

// initialize tracking ID
ReactGA.initialize('G-794H035CXL');

const pageViewGa = (WrappedComponent, options = {}) => {
    const trackingPageView = page => {
        ReactGA.set({
            page,
            ...options
        })

        ReactGA.pageview(page)
    }
    return class extends Component {
        state = {
            page: null
        }

        static getDerivedStateFromProps(props, state) {
            const page = props.location.pathname + props.location.search
            if (page !== state.page) {
                return {
                    page
                }
            }

            return null
        }

        componentDidMount() {
            const page = this.props.location.pathname + this.props.location.search
            trackingPageView(page)
        }

        componentDidUpdate(prevProps) {
            const currentPage = prevProps.location.pathname + prevProps.location.search
            const nextPage = this.state.page

            if (currentPage !== nextPage) {
                trackingPageView(nextPage)
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }

    }
}

export default pageViewGa
