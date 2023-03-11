

const AlldrsDoneWebsite = ({ drs }) => {


    return (
        <>
            <>
               
                {
                    drs.map((dr) => {
                        const { _id, name, email, status,mrID,manager,website } = dr;
                        
                        return (
                            <tr class="bg-gray-100 border-b" key={_id}>
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
                                   {mrID}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                   {manager}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                   {website}
                                </td>
                            </tr>
                        )
                    })
                }
            </>
        </>
    )
}


export default AlldrsDoneWebsite