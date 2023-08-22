import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-manager',
  templateUrl: './manage-manager.component.html',
  styleUrls: ['./manage-manager.component.scss']
})
export class ManageManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function(){
  
      $('#eye').click(function(){
           
            if($(this).hasClass('fa-eye-slash')){
               
              $(this).removeClass('fa-eye-slash');
              
              $(this).addClass('fa-eye');
              
              $('#password').attr('type','text');
                
            }else{
             
              $(this).removeClass('fa-eye');
              
              $(this).addClass('fa-eye-slash');  
              
              $('#password').attr('type','password');
            }
        });
    });
  }

}
