import moment = require("_moment@2.29.1@moment");

export class Lock {
    //key = concat(r_id,r_code)
    locks:{[key:string]: Date} = {};

    addLock(r_id:string, r_code:string):boolean {
        const key = `${r_id}${r_code}`;
        this.locks[key] = new Date();
        return true;
    }

    hasLockIn(r_id:string, r_code: string):boolean {
        const key = `${r_id}${r_code}`;
        if(this.locks[key]) {
            return true;
        }

        return false;
    }


    // clear the un_use lock
    clear() {
        Object.keys(this.locks).map(lockKey => {
            if(moment().diff(moment(this.locks[lockKey]), "minutes") >= 5) {
                delete this.locks[lockKey];    
            }
        })
    }
}


export default new Lock();