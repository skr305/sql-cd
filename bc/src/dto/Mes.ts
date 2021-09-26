 /** 0 for feedback, 1 for change room, 2 for dis room, 3 for not feedback  */
type Mes = {
    // generate the time from the id
    m_id: string;

    content: string;
    type: string;

    sender: string;
    target: string;

    has_read: string;
    _date: string;
}

export default Mes;