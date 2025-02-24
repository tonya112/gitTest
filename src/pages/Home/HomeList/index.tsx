import {Image, InfiniteScroll, List} from 'antd-mobile'

import {fetchListAPI, ListRes} from "@/apis/list.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    channelId: string
}
const HomeList = ({channelId}: Props) => {


    const [listRes,setListRes] = useState<ListRes>({
        results:[],
        pre_timestamp: '' + new Date().getTime() //test dayjs
    })

    useEffect(() => {
        const getList = async () => {
            try {
                const res = await fetchListAPI({
                    channel_id: channelId,
                    timestamp: '' + new Date().getTime() // micic confliction test
                })
                setListRes({
                    results: res.data.data.results,
                    pre_timestamp: res.data.data.pre_timestamp
                })
            } catch (err) {
                throw new Error('请求失败:' + err)
            }
        }

        getList()
    }, [channelId]);

    //开关，是否还有数据
    const [hasMore, setHasMore] = useState(true)
    //加载下一页的数据
    const loadMore = async () => {
        console.log('loadMore...')
        try {
            const res = await fetchListAPI({
                channel_id: channelId,
                timestamp: listRes.pre_timestamp
            })
            setListRes({
                results: [...listRes.results, ...res.data.data.results],
                pre_timestamp: res.data.data.pre_timestamp
            })

            //停止监听
            if(res.data.data.results.length === 0)
            {
                setHasMore(false)
            }
        } catch (err) {
            throw new Error('请求失败:' + err)
        }

    }

    const navigate = useNavigate()
    const goToDetail = (art_id: string) => {
        navigate(`/detail?id=${art_id}`)
    }

    return (
        <>
            <List>
                {listRes.results.map((item) => (
                    <List.Item
                        onClick={() => goToDetail(item.art_id)}
                        key={item.art_id}
                        prefix={
                            item.cover.images?.map(img => (
                                    <Image
                                        src={img}
                                        style={{borderRadius: 20}}
                                        fit="cover"
                                        width={40}
                                        height={40}
                                    />
                            ))
                        }
                        description={item.pubdate}
                    >
                        {item.title}
                    </List.Item>
                ))}
            </List>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10}/>
        </>
    )
}

export default HomeList