


const AdminAllMembers = ({ members }) => {
    console.log(members)
    const role_mapping = (role) => {
        // console.log(role)
        const roles = {
            0: 'mr',
            1: 'Tech',
            2: 'Manager',
            3: 'Admin',
        }

        return roles[role]
    }
    return (
        <>
            {
                members.map((member) => {
                    const { name,email,role,managerID,adminID } = member;
                    return (
                        <tr class="bg-gray-100 border-b">
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {name}
                            </td>
                            <td class="text-sm text-gray-899 font-light px-6 py-4 whitespace-nowrap">
                              {email} 
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {/* {role} */}
                                {role_mapping(role)}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {managerID}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {adminID}
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}



export default AdminAllMembers