

const AlldrsDoneWebsite = ({ drs }) => {


    return (
        <>
            <>
               
                {
                    drs.map((dr) => {
                        // const { _id, name, email, status,mrID,manager,website } = dr;
                        const { _id,firstname,middlename,lastname,phone,email,qualification, specialty,experience,domain,address,license, status,mrID,managerID,adminID,website } = dr;
                        
                        return (
                            <tr class="bg-gray-100 border-b" key={_id}>
                                 <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {firstname}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {middlename}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {lastname}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {phone}
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {email} 
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {qualification} 
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {specialty} 
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {experience} 
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {domain} 
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {address} 
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {license} 
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {status}
                            </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                   <a href={`//${website}`} target="_blank">{website}</a>
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