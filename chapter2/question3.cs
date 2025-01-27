public class CustomerSearch{
    public List < Customer > GetFilteredCustomers(string filter){
        var filteredCustomers = from customer in db.customers where customer.Country.Contains(filter)
                    orderby customer.CustomerID ascending select customer;
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
