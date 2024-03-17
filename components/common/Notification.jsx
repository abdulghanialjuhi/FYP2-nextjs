import { useContext, useEffect } from "react";
import { Context } from "../../context/GlobalState";

const NotifcationContainerClasses = "fixed flex flex-col justify-center items-center top-0 left-0 right-0 mx-auto bg-transparent w-[500px] p-[15px] h-auto max-h-[400px] overflow-hidden gap-[10px] z-[10000]";

const NotficationContentClasses = (type) => {
  return `flex justify-center gap-[10px] items-center bg-white p-[10px] w-[400px] border-[1px] border-solid ${
    type === 'danger' ? 'border-[#b60b0b]' :
    type === 'success' ? 'border-[#087208]' : 'border-[#aa4b07]'
  } rounded-5 animate-notification`;
};

const IconContainerClasses = (type) => {
  return `flex items-center color-${
    type === 'danger' ? '[#b60b0b]' :
    type === 'success' ? '[#2f7c2f]' : '[#aa4b07]'
  }`;
};

function routeIcons(type) {
    if (type === 'danger') return 'fa-exclamation-triangle  color-red';
    else if (type === 'success') return 'fa-check  color-green';
    else return 'fa-exclamation  color-orange';
}


const MessageContainerClasses = "word-wrap break-word flex-grow max-w-[350px] min-h-[20px] max-h-[80px] overflow-hidden";

const NotificationMessageClasses = "text-sm font-normal break-word";

export default function Notifcation() {
    const { actions, notificationStatus } = useContext(Context);

    useEffect(() => {
        const timeOut = setInterval(() => {
            // console.log('srrr');
            if (notificationStatus.length > 0) {
                actions({type: 'SET_NOTIFCATION_STATUS', payload: (prev) => prev.filter(i => i.timeremaining > 0).map(item => {
                    return {
                        ...item, timeremaining: item.timeremaining - 0.2
                    }
                })
            }) 
            }
        }, 200)

        if (notificationStatus.length <= 0) {
            clearInterval(timeOut)
        }

        return () => clearInterval(timeOut)
    }, [notificationStatus])




    return (
        <div className={NotifcationContainerClasses}>
        {notificationStatus?.map((notification, i) => (
            <div key={i} className={NotficationContentClasses(notification.type)}>
            <div className={IconContainerClasses(notification.type)}>
                <i className={`fa ${routeIcons(notification.type)}`}></i>
            </div>
            <div className={MessageContainerClasses}>
                <span className={NotificationMessageClasses}>
                {notification.message}
                </span>
            </div>
            </div>
        ))}
        </div>
    );
}
