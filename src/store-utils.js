import  {observable, action, computed} from 'brain-store';

export function observablePromise(promise) {
    return new ObservablePromiseModel(promise);
}

export const RESOLVE_ACTION = 'observableFromPromise-resolve';
export const REJECT_ACTION = 'observableFromPromise-reject';

export const promiseStatus = {
    pending: 'pending',
    resolved: 'resolved',
    rejected: 'rejected'
};

export class ObservablePromiseModel {
    // promise = null;
    @observable state = promiseStatus.pending;
    @observable error = null;
    @observable value = null;

    constructor(promise) {
        // this.promise = promise;
        promise.then(
            action(RESOLVE_ACTION, (value) => {
                this.state = promiseStatus.resolved;
                this.value = value;
            }),
            action(REJECT_ACTION, (error) => {
                this.state = promiseStatus.rejected;
                this.value = null;
                this.error = error;
            })
        );
    }

    @computed get isPending() {
        return this.state == promiseStatus.pending;
    }

    @computed get isResolved() {
        return this.state == promiseStatus.resolved;
    }

    @computed get isRejected() {
        return this.state == promiseStatus.resolved;
    }
}

export {observableViewModel} from 'brain-store-utils';