import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProductApiService } from './myservices/product-api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularCrudProject';

  displayedColumns: string[] = ['id', 'ProductName', 'Categiory', 'Freshness','Price','date','Comments','Action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private pdApi:ProductApiService)
  { 
  }

  ngOnInit(): void {
        this.getAllProducts();    
     }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=='save')
      {
        this.getAllProducts();
      }
    });
    console.log("add Prodcuts Form is Open..!");  
  }
// get all
getAllProducts(){
  this.pdApi.getProducts()

  .subscribe({
        next:(res)=>{
          console.log("printing records..!");  
          console.log(res);
   this.dataSource=  new MatTableDataSource(res);
   this.dataSource.paginator= this.paginator;
   this.dataSource.sort=this.sort;
        },
        error:(err)=>{
          alert("error while fetching...!")}
        })
      }
      
      // edit
      editProduct(row:any){
        this.dialog.open(DialogComponent,{
          width:'30%',data:row
        }).afterClosed().subscribe(val=>{
          if(val='update')
          {
            this.getAllProducts();
          }
        })
      }

      // delete
      deleteProduct(id:number)
      {
        this.pdApi.deleteProduct(id)
        .subscribe(
          {
            next:(res)=>{
              alert("product delete Successfully...!")
              this.getAllProducts();
            },
            error:()=>{
              alert("error while deleting...!")
            }
          })
      }// end delete

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }


  }

