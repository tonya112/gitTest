import "./style.css"
import {Tabs} from 'antd-mobile'
import {useTab} from "@/hooks";
import HomeList from "@/pages/Home/HomeList";
const Home = () => {

    const {channels} = useTab()


  return (
    <div>
      <div className = 'tabContainer'>
        <Tabs defaultActiveKey={'0'}>
            {channels.map((item)=>{
                return <Tabs.Tab title={item.name} key={item.id}>
                    <div className = 'listContainer'>
                        <HomeList channelId = {'' + item.id}/>
                    </div>
                </Tabs.Tab>
            })}



        </Tabs>

      </div>

    </div>
  )
}

export default Home