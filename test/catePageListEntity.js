import {JsonProperty, MapperEntity} from 'json-mapper-object';

export class CatePageListEntity {
    rows = null;

    total = 0;

    pageIndex = 1;

    pageSize = 1;

    totalPage = 0;

    constructor(api) {
        api = api || {};
        let result = api.result;
        this.rows = this.transformRows(result.Data);
        this.total = result.Total;
        this.pageIndex = result.PageIndex;
        this.pageSize = result.PageSize;
        this.totalPage = result.TotalPage;
    }

    transformRows(rows) {
        return (rows || []).map((row) => {
            return MapperEntity(CateEntity, row);
        })
    }
}

export class CateEntity {

    @JsonProperty('_id')
    id = void 0;

    @JsonProperty('CateName')
    cateName = void 0;

    constructor() {
        this.id = void 0;
        this.cateName = void 0;
    }
}