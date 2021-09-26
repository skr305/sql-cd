import { useEffect, useState } from "react";
import Bus from '../../util/bus'
import _Error from './error';

const view = (props) => {
    return (
        <div>
            { 
                (() => {
                    return props.coms[props.rot.path]({ use_glb_sta: props.use_glb_sta,
                        ...props.rot.pams})
                })()
                 
            }
        </div>
    )
}

export default (props) => {

    const init_rots = {"_error": Error, ...(props.init || {})}


    //for the glb state
    const MAX_STAS = 5; 

    const stas = [
        useState(0),
        useState(0),
        useState(0),
        useState(0),
        useState(0)
    ]

    let poi = 0;
    const name_map = {}
    
    const use_glb_sta = (name, init_val) => {
        
        
        const map_poi = name_map[name]
        
        if(!map_poi) {
            return mak_sta(name, init_val);
        }

        return stas[map_poi]
    }

    const mak_sta = (name, init_val) => {
        if(poi < MAX_STAS) {
            const [sta, set_sta] = stas[poi];
            name_map[name] = poi++;
            return [sta, set_sta]
        }
    }

    /*****/

    const [coms, set_coms] = useState(init_rots);
    const [rot, set_rot] = useState({
        path: "/",
        pams: {}
    })




    useEffect(() => {
        Bus.addListener("swc", (path, pams) => {
            if(!coms[path]) {
                set_rot({...rot , path: '/_error'});
                return;
            }

            console.log(pams);
            set_rot({path, pams});
        });

        Bus.addListener("add_rot", (path, com) => {
            set_coms({...coms, [path]: com});
        })

    }, [])


    return view({
        coms,
        rot,
        use_glb_sta
    })
}