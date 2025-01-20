type Food = {
    id: string;
    name: string;
    barcode: string;  // `barcode` is now a string
    created_at: string | Date;
  };
  
  type TableViewProps = {
    food: Food[];  // Receiving food as a prop
  };
  
  const Tableview = ({ food }: TableViewProps) => {
    if (!Array.isArray(food)) {
      return <div>Error: Data is unavailable.</div>;
    }
  
    return (
      <div className="container center">
        <h1>Ingredients</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th>name</th>
              <th>barcode</th>
              <th>date added</th>
            </tr>
          </thead>
          <tbody>
            {food.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.barcode}</td> 
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Tableview;
  