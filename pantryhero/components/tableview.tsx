"use client";

const Tableview = ({ food }:any) => {
  if (!Array.isArray(food['food'])) {
    return <div>Error: Data is unavailable.{JSON.stringify(food)}</div>;
  }

  return (
    <div className="container center">
      <h1>Pantry</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th>name</th>
            <th>barcode</th>
            <th>date added</th>
          </tr>
        </thead>
        <tbody>
          {food != null? 
          food['food'].map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{`${item.barcode}`}</td> 
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          )):
          <p>no</p>
        }
        </tbody>
      </table>
    </div>
  );
};

  export default Tableview;
  