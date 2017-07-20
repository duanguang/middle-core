import {get,post} from "../src/fetch/index";
import expect from 'expect';
import {CatePageListEntity} from './catePageListEntity'

function getPageListCate(page,queryParams,sortParams){
    return get('http://localhost:8891/blog/GetPageCateList',{page:page},CatePageListEntity).then((result)=>{
        return result;
    });
}

describe('fetch', () => {
    it('basic', () => {
        return getPageListCate(1).then((result)=>{
            console.log(result);
        },(error)=>{
            console.log(1);
            console.log(error);
        });
    });
});
