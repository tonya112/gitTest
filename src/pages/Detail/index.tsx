import {useEffect, useState} from "react";
import {DetailDataType, fetchDetailAPI} from "@/apis/detail.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {NavBar} from "antd-mobile";

const Detail = ({}) => {

    const [detail, setDetail] = useState<DetailDataType | null>(null)

    const [params] = useSearchParams()
    const id = params.get('id')

    const navigate = useNavigate()
    const back = () => navigate(-1)
    useEffect(() => {
        const getDetail = async () => {
            try {
                const res = await fetchDetailAPI(id!)
                setDetail(res.data.data)
            }
            catch (e) {
                console.log("请求detail失败：" + e)
            }
        }

        if(id)
        {
            getDetail()
        }
    }, [id]);

    if(!detail)
    {
        return <div>this is loading</div>
    }

    return (
        <div>
            <NavBar onBack={back}>{detail?.title}</NavBar>
            <div dangerouslySetInnerHTML={{ __html: detail?.content }}/>
        </div>
    )
}

export default Detail