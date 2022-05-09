import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ProductApiService } from 'src/app/myservices/product-api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList =["Brand New","Second Hand", "Republished"];
  productForm !: FormGroup;
  ActionBtn: string= "Save";

  constructor(private formBuilder :FormBuilder , private pdApi:ProductApiService, 
    private dialogRef:MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA)   public editData :any) 
  { }

  ngOnInit(): void {

    this.productForm=this.formBuilder.group({
      ProductName :['',Validators.required],
      Categiory :['',Validators.required],
      Freshness:['',Validators.required],
      Price:['',Validators.required],
      Comments:['',Validators.required],
      date:['',Validators.required] 
      });
      console.log(" fetch edit data");
      console.log(this.editData);

      if(this.editData){
        this.ActionBtn="Update";
        this.productForm.controls['ProductName'].setValue(this.editData.ProductName);
        this.productForm.controls['Categiory'].setValue(this.editData.Categiory);
        this.productForm.controls['Freshness'].setValue(this.editData.Freshness);
        this.productForm.controls['Price'].setValue(this.editData.Price);
        this.productForm.controls['date'].setValue(this.editData.date);
        this.productForm.controls['Comments'].setValue(this.editData.Comments);
      }

  }
  

  addProduct()
  {
   if(!this.editData)
   {
     if(this.productForm.valid)
    {
    this.pdApi.postProducts(this.productForm.value)
    .subscribe({
        next:(res)=>{ alert("product Added successfully...!")
      this.productForm.reset();
      this.dialogRef.close('save');
      },
        error:()=>{ alert("something went wrong by adding product...!")}
      })
  }
    console.log(this.productForm.value); 
  } // end if
  else{
    this.updateProduct()
  }

  }  // end addProduct

  updateProduct(){
    this.pdApi.updateProduct(this.productForm.value,this.editData.id)
    .subscribe({
next:(res)=>{
  alert("product updated Successfully...!");
  this.productForm.reset();
  this.dialogRef.close('update');
 },
 error:()=>{
   alert("error while updating...!")
 } 
})
  }  // end update


}  // onInit
