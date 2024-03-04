import React from 'react';
import styles from '../tables/table.module.css';

interface TableProps {
    columns: string[];
    data: { id: number; values: string[] }[];
    baseRoute: string; // Prop adicional para a base da URL
}

const Table: React.FC<TableProps> = ({ columns, data, baseRoute }) => {

    const handleRowClick = (id: number) => {
        // Utiliza window.location para mudar a URL e navegar para a página de detalhes
        window.location.href = `${baseRoute}/${id}`;
    };

    return (
        <div className={styles.tableDiv}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th className={styles.th} key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={row.id} className={rowIndex % 2 === 0 ? styles.evenRow : ''}>
                            {row.values.map((value, index) => (
                                <td className={styles.td} key={index}>{value}</td>
                            ))}
                            <td className={`${styles.td} ${styles.tdEdit}`} onClick={() => handleRowClick(row.id)}>➔</td>
                        </tr>
                    ))}
                </tbody>
                {/* <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {row.values.map((value, index) => (
                                <td className={styles.td} key={index}>{value}</td>
                            ))}
                            <td className={`${styles.td} ${styles.tdEdit}`} onClick={() => handleRowClick(row.id)}>➔</td>
                        </tr>
                    ))}
                </tbody> */}
            </table>
        </div>
    );
};

export default Table;
