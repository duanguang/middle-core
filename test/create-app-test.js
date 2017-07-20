import create from '../src/index';
import React from 'react';
import expect from 'expect';
// @store('common.users.TestStore')
// export default class TestStore {
//
// }
//
// const TestStoreByFunc = store({namespace: 'common.users.TestStore', lazy: true})(TestStore)

const createLegion = create({enableDevTools: false});

describe('legion', () => {
    it('basic', () => {
        const app = create({enableDevTools: false});
        const App = (props) => {
            expect(props.app).toEqual(app);
            return <div>test</div>;
        };

        app.start(App, '#root');
        console.log(global.window.document.documentElement.outerHTML);
    });
});
