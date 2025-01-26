public class CustomerSearch{
    public List < Customer > GetFilteredCustomers(string filter){
        var filteredCustomers = from c in db.customers where c.Country.Contains(filter)
                    orderby c.CustomerID ascending select c;
        return filteredCustomers.ToList();
    }
} 

public class CustomerExport{
    public string ExportToCSV(List < Customer > customers){
        StringBuilder stringBuilder = new StringBuilder();
        foreach(var customer in customers){
            stringBuilder.AppendFormat("{0},{1}, {2}, {3}", customer.CustomerID, customer.CompanyName, customer.ContactName, customer.Country);
            stringBuilder.AppendLine();
        }
        return stringBuilder.ToString();
    }
}
