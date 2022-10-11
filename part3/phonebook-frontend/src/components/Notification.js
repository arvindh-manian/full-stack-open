const Notification = ({ type, message }) => {
    if (message === "") {
        return null
    }
    
    const notifStyle = {
        color: (type === "success") ? 'green' : 'red',
        backgroundColor: 'lightGray',
        padding: 5,
        fontSize: 15,
        border: 'solid',
        borderRadius: 5,
        marginBottom: 10
    }

    return (
        <div style={notifStyle}>{message}</div>
    )
}

export default Notification