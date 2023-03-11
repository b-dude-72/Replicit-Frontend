


const AdminAllDrs = ({ drs }) => {
    return (
        <>
            {
                drs.map((currdr) => {
                    const { name, email, status,rejectmessage } = currdr;
                    return (
                        <tr class="bg-gray-100 border-b">
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {name}
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {email} 
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {status}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {rejectmessage}
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}



export default AdminAllDrs