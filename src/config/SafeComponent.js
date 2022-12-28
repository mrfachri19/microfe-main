import React from "react";
import HalamanError from "../components/Content/HalamanError";

export default class SafeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return (
        <div className="">
          <HalamanError text={this.props.name} />
        </div>
      );
    }

    return this.props.children;
  }
}
