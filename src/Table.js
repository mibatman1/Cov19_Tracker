import './Table.css';
const Table=({countries})=>
{
    return(
        <div className="table">
            {countries.map(country=>
                {
                    return(
                        <tr>
                            <td>{country.country}</td>
                            <td>
                                <strong>{country.cases}</strong>
                            </td>
                        </tr>
                    );
                })}

        </div>
    );
}

export default Table;