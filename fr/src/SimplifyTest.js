class RenderEntry {
    // current entry id 
    state = 0;

    AppEntrys = [];

    AppAlias = {};
    
    addEntry(app, alias = null) {
        this.AppEntrys.push(app);

        if(!alias) {
            this.AppAlias[alias] = app;
        }
    }

    getEntry(descriptor) {
        if(typeof descriptor == "number") {
            return this.AppEntrys[descriptor];
        }
        return this.AppAlias[descriptor];
    }
}


export default new RenderEntry();