import HealthBar from "./HealthBar.js";

export default class Player2 extends Phaser.Physics.Arcade.Sprite {
   //export default class player extends Phaser.GameObjects.Sprite  {
   health = 100;
   money = 0;

   constructor(data) {
      let { scene, x, y, texture_idle, texture_run, texture_jump, texture_attack, texture_shot, frame } = data;
      super(scene, x, y, texture_idle, frame);
      this.scene.add.existing(this);       // добавление на сцену, без этого персонажа просто не видно
      this.scene.physics.add.existing(this); // без этого не создается body и поэтому недьзя установить скорость
      this.texture_shot = texture_shot;
      this.body.setSize(55, 75, true);

      this.hbar = new HealthBar(scene, this.x, this.y - 5);
      this.texture_shot = texture_shot;


      this.anims.create({
         key: 'girl_idle_right',
         frames: this.anims.generateFrameNames(texture_idle, { prefix: 'girl_idle_', start: 1, end: 1 }),
         frameRate: 10,
         repeat: 0
      });


      this.anims.create({
         key: 'girl_run_r',
         frames: this.anims.generateFrameNames(texture_run, { prefix: 'girl_run_', start: 1, end: 7 }),
         frameRate: 10,
         repeat: -1
      });

      
      this.anims.create({
         key: 'girl_attack',
         frames: this.anims.generateFrameNames(texture_attack, { prefix: 'girl_attack_', start: 1, end: 4 }),
         frameRate: 30,
         repeat: 2
      });

      /*
      this.afb = this.anims.create({
             key: 'afb',
             frames: this.anims.generateFrameNames(texture_shot, { prefix: 'fb', start: 1, end: 4 }),
             frameRate: 10,
             repeat: -1
      });
      */

      this.bfire1Pressed = false;
      this.bleftPressed = false;
      this.brightPressed = false;
      this.bjumpPressed = false;

      this.enableBody = true;

      this.inputKeys = scene.input.keyboard.addKeys({
         up: Phaser.Input.Keyboard.KeyCodes.I,
         down: Phaser.Input.Keyboard.KeyCodes.K,
         left: Phaser.Input.Keyboard.KeyCodes.J,
         right: Phaser.Input.Keyboard.KeyCodes.L,
         space: Phaser.Input.Keyboard.KeyCodes.N
      });

   }
   /*
     wizard_add_money( value ) {
        this.money += value;
     }
   
     wizard_press_virtual(virtual_key, state) {
        if ( virtual_key == 'up') {
           this.bjumpPressed = state;
        } else if ( virtual_key == 'left') {
           this.bleftPressed = state; 
        } else if ( virtual_key == 'right') {
           this.brightPressed = state;
        } else if ( virtual_key == 'space') {
           if (state) this.wizard_fire1();  
           //this.bfire1Pressed = state;
        } 
     }*/

   girl_idle_r() {
      this.body.velocity.x = 0;
      this.anims.play('girl_idle_right', true);
   };

   girl_move_left() {
      this.body.velocity.x = -100;
      this.setFlipX(true);
      this.anims.play('girl_run_r', true);
   };

   girl_move_right = () => {
      this.body.velocity.x = 100;
      this.setFlipX(false);
      this.anims.play('girl_run_r', true);
   };

   wizard_jump = () => {
      this.body.velocity.y = -400;
   };

   girl_attack_r() {
      this.body.velocity.x = 0;
      this.anims.play('girl_attack', true);
   };
/*
   wizard_fb_shot = () => {
      var x, y, v, delta, shot;
      delta = this.body.width + 4;
      v = 300;
      if (this.flipX) {
         v = -v; delta = 0;
      }
      x = this.body.x + delta;
      y = this.body.y + 23;
      shot = this.scene.physics.add.sprite(x, y, this.texture_shot, 0);
      shot.body.setAllowGravity(false);
      shot.anims.create({
         key: 'aFireball',
         frames: this.anims.generateFrameNames(this.texture_shot, { prefix: 'fb', start: 1, end: 4 }),
         frameRate: 10,
         repeat: -1
      });

      shot.anims.play('aFireball', true);
      shot.enableBody = true;
      shot.body.velocity.x = v;
      shot.setFlipX(this.flipX);
   }*/


   /*wizard_fire1 = () => {
      this.anims.stop();
      this.anims.play('wiz_attack2', false)
      // попытка выполнения чего-либо по завершению анимации
      // (Нужно стрельнуть молнией, разрешить остановленную анимацию) 
      // 'animationcomplete' не работает, а событие повтора анимации означает что анимация ЗАКОНЧИЛАСЬ и начинается снова
      // Вот такое решение :(
      this.wizard_fb_shot();
      this.on('animationrepeat',()=>{ /*console.log("repeat");*//* this.bfire1Pressed = false;});                                                                     
   this.bfire1Pressed = true;             
};
*/



   get velocity() {
      return this.body.velocity;
   }

   update() {
      this.body.velocity.x = 0;

      if (!this.bfire1Pressed) {
         if (this.inputKeys.left.isDown) {
            this.girl_move_left()
         }

         if (this.inputKeys.right.isDown) {
            this.girl_move_right()
         }




         /*  //if ( this.body.onFloor() && this.inputKeys.up.isDown) {   // && Phaser.Input.Keyboard.JustDown(this.inputKeys.up) ) {
           if ( this.body.onFloor() && Phaser.Input.Keyboard.JustDown(this.inputKeys.up) ) {
              console.log('op');
              this.wizard_jump();
           } 
 
          if ( this.bleftPressed ) {
             this.wizard_move_left()
          }
 
          if ( this.brightPressed ) {
             this.wizard_move_right()
          }
 
          if ( this.bjumpPressed ) {
            if ( this.body.onFloor() ) {  
               this.wizard_jump();
            }
          }*/

         //стоит на месте
         if ((this.body.velocity.x == 0) && (this.body.velocity.y == 0)) {
            this.anims.play('girl_idle_right', false);
         }

      }

      //девочка атакует
      if (this.inputKeys.space.isDown) {
         this.girl_attack_r();
      }


      this.hbar.x = this.body.x;
      this.hbar.y = this.body.y - 9;
      this.hbar.value = this.health;
      this.hbar.draw();

   }


}