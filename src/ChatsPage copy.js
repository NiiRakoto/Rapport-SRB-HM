import { PrettyChatWindow } from 'react-chat-engine-pretty'

const ChatsPage = (props) => {
    
    return (
    <div style={{height : '100vh'}}>
        <PrettyChatWindow
            projectId='50f3c7b2-6190-4cb9-81e2-cbb8a46eb7b9'
            username={props.user.username}
            secret={props.user.secret}
            style={{height : '100%'}} 
        />
    </div>
    )
}

export default ChatsPage;












import { MultiChatSocket , MultiChatWindow , useMultiChatLogic} from 'react-chat-engine-advanced'

const ChatsPage = (props) => {
    const chatProps = useMultiChatLogic(
        '50f3c7b2-6190-4cb9-81e2-cbb8a46eb7b9' , 
        props.user.username , 
        props.user.secret
        );
     

    return <div style={{height : '100vh'}} >
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow {...chatProps}  style={{height : '100%'}} />

    </div>
}

export default ChatsPage;