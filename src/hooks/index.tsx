import {ChannelItem, fetchChannelAPI} from "@/apis/list.ts";
import {useEffect, useState} from "react";

const useTab = () => {
    const [channels,setChannels] = useState<ChannelItem[]>([])

    useEffect(()=>{
        const getChannel = async () =>{
            try{
                const res = await fetchChannelAPI()
                setChannels(res.data.data.channels)
            }
            catch(err){
                throw new Error('请求失败:' + err)
            }
        }

        getChannel()

    },[])

    return {channels}
 }

 export {useTab}