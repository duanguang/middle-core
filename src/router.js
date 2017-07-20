const router = require('brains/lib/router');
import React from 'react';
const {Route}=router;
class RouteMiddle extends React.Component{
    componentDidMount() {
        this.handleSetWxTitle(this.props.title);
    }

    handleSetWxTitle(title) {
        if (title) {
            document.title = title;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.title !== this.props.title) {
            this.handleSetWxTitle(nextProps.title);
        }
    }

    render() {
        return (
            <Route  {...this.props}/>
        )
    }
}

module.exports = {
    Router: router.Router,
    Link: router.Link,
    IndexLink: router.IndexLink,
    withRouter: router.withRouter,
    IndexRedirect: router.IndexRedirect,
    IndexRoute: router.IndexRoute,
    Redirect: router.Redirect,
    Route: router.Route,
    RouterContext: router.RouterContext,
    createRoutes: router.createRoutes,
    locationShape: router.locationShape,
    routerShape: router.routerShape,
    match: router.match,
    formatPattern: router.formatPattern,
    useRouterHistory: router.useRouterHistory,
    applyRouterMiddleware: router.applyRouterMiddleware,
    browserHistory: router.browserHistory,
    hashHistory: router.hashHistory,
    createMemoryHistory: router.createMemoryHistory,
    Switch:router.Switch,
    redirect: router.redirect,
    HashRouter:router.HashRouter,
    RouteMiddle:RouteMiddle
};
