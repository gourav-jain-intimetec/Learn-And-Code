// Answer :- Book class doesn't follow SRP because the working of function save and getLocation is not the responsibility of book class instead they could be define in some parent class like library.
//Solution 
class Library {

     function getLocation() {
        // returns the position in the library
        // ie. shelf number & room number
    }

    function save() {
        $filename = '/documents/'. $this->getTitle(). ' - ' . $this->getAuthor();
        file_put_contents($filename, serialize($this));
    }
}

class Book {
 
    function getTitle() {
        return "A Great Book";
    }
 
    function getAuthor() {
        return "John Doe";
    }
 
    function turnPage() {
        // pointer to next page
    }
 
    function getCurrentPage() {
        return "current page content";
    }
 
}

interface Printer {
 
    function printPage($page);
}
 
class PlainTextPrinter implements Printer {
 
    function printPage($page) {
        echo $page;
    }
 
}
 
class HtmlPrinter implements Printer {
 
    function printPage($page) {
        echo '<div style="single-page">' . $page . '</div>';
    }
}
