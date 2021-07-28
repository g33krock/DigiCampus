import React, { Component } from "react";

export default class Calendar extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: '<iframe src="https://calendar.google.com/calendar/embed?src=azaspire.com_jl1kajauobmvbqg6sqcj7nn50o%40group.calendar.google.com&ctz=America%2FPhoenix" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'}} />
        )
    }
}
