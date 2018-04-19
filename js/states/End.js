var Flood = Flood || {};

Flood.EndState = {
    create: function ()
    {
        //Add buzzing audio
        this.buzz=this.add.audio('buzzing');
        this.buzz.play('', 0, 1, true);
        //Adds the background
        this.add.sprite(0, 0, 'end');
        //Adds the text of the 'type' of honey you made-dependant on the last flood colour
        this.honeyText = this.add.text(this.world.centerX, 40, `You Made ${Flood.HoneyType}`, {font: "40px Nosifer", fill: "#FF9900", stroke: "#FFFF00", strokeThickness: 5});
        this.honeyText.anchor.setTo(0.5, 0.5);
        //Adds the jar of honey to be 'flown' in-dependant on the last flood colour
        this.jar = this.add.sprite(900, 150, `${Flood.HoneyPot}HoneyJar`);
        this.jar.scale.setTo(0.01, 0.01);
        //Lays the coupon on the jar as the jar label
        this.coupon = this.add.sprite(100, 180, 'coupon');
        this.coupon.scale.setTo(0.34, 0.36);
        this.coupon.anchor.setTo(0.5, 0.5);
        //Attaches the coupon movements to the jar
        this.jar.addChild(this.coupon);
        //Adds the coloured bee as detail on the jar-dependant on the last flood colour
        this.bee = this.add.sprite(0, 100, `${Flood.HoneyPot}Bee`);
        this.bee.scale.setTo(0.5, 0.5);
        this.jar.addChild(this.bee);
        //Adds the coloured floodie as detail on the jar-dependant on the last flood colour
        this.backerFloodie = this.add.sprite(150, 205, `${Flood.HoneyPot}Floodie`);
        this.backerFloodie.scale.setTo(0.5, 0.5);
        this.jar.addChild(this.backerFloodie);
        //Adds the detailed floodie, used when the colour is shown as the final colour, for detail
        this.floodie = this.add.sprite(150, 205, `${Flood.HoneyPot}FilledFloodie`);
        this.floodie.scale.setTo(0.5, 0.5);
        this.jar.addChild(this.floodie);
        //The two bees who 'fly' the jar in
        this.flyBee1=this.add.sprite(900, 150, 'flyBee');
        this.flyBee1.animations.add('fly');
        this.flyBee1.animations.play('fly', 50, true);
        this.flyBee1.scale.setTo(-0.01, 0.01);
        this.flyBee2=this.add.sprite(900, 150, 'flyBee');
        this.flyBee2.animations.add('fly');
        this.flyBee2.animations.play('fly', 50, true);
        this.flyBee2.scale.setTo(0.01, 0.01);
        //Tweens to move the jar in and scale it up
        this.add.tween(this.jar.scale).to({x: 1, y: 1}, 7000, "Linear", true);
        this.add.tween(this.jar).to({x: 400, y: 200}, 7000, "Linear", true);
        //Tweens to move the bees in and scale them up
        this.add.tween(this.flyBee1.scale).to({x: -1, y: 1}, 7000, "Linear", true);
        this.add.tween(this.flyBee1).to({x: 450, y: 45}, 7000, "Linear", true);
        this.add.tween(this.flyBee2.scale).to({x: 1, y: 1}, 7000, "Linear", true);
        this.lastTween = this.add.tween(this.flyBee2).to({x: 550, y: 40}, 7000, "Linear", true);
        //Once the bees have flown in they twirl off to the sides
        this.lastTween.onComplete.add(function()
        {
            this.flyBee1.x = 350;
            this.flyBee1.y = 150;
            this.flyBee1.pivot.x = 150;
            this.flyBee1.pivot.y = 150;
            this.add.tween(this.flyBee1).to({x: 250}, 500, "Linear", true);
            let twirlTween = this.add.tween(this.flyBee1).to({rotation: -6}, 2000, "Linear", true);
            twirlTween.onComplete.add(function()
            {
                this.add.tween(this.flyBee1).to({rotation: -8}, 1000, "Linear", true);
                this.add.tween(this.flyBee1).to({x: -50, y: -50}, 500, "Linear", true);
                this.flyBee2.x = 650;
                this.flyBee2.y = 150;
                this.flyBee2.pivot.x = 150;
                this.flyBee2.pivot.y = 150;
                this.add.tween(this.flyBee2).to({x: 750}, 500, "Linear", true);
                let twirlTween = this.add.tween(this.flyBee2).to({rotation: 6}, 2000, "Linear", true);
                twirlTween.onComplete.add(function()
                {
                    this.add.tween(this.flyBee2).to({rotation: 8}, 1000, "Linear", true);
                    this.add.tween(this.flyBee2).to({x: 1000, y: -50}, 500, "Linear", true);
                    //If there is another round to be played a button is displayed to allow replay
                    this.allData = JSON.parse(this.game.cache.getText('floodData'));
                    Flood.currentRound++;
                    //Stop the buzzing
                    Flood.EndState.buzz.stop();
                    if(Flood.currentRound < this.allData.Rounds.length)
                    {
                        this.add.button(500, 500, 'start', function()
                        {
                            this.game.state.start('Game');
                        }, this);
                    }
                    
                }, this);
                
            }, this);
        }, this);
        //Tweens to swing the jar from side to side so it appears to be 'carried' by the two flying bees
        var swing1 = this.add.tween(this.jar).to({rotation: 0}, 700, "Linear");
        var swing2 = this.add.tween(this.jar).to({rotation: -0.1}, 500, "Linear");
        var swing3 = this.add.tween(this.jar).to({rotation: 0.1}, 500, "Linear");
        var swing4 = this.add.tween(this.jar).to({rotation: -0.1}, 500, "Linear");
        var swing5 = this.add.tween(this.jar).to({rotation: 0.1}, 500, "Linear");
        var swing6 = this.add.tween(this.jar).to({rotation: -0.1}, 500, "Linear");
        var swing7 = this.add.tween(this.jar).to({rotation: 0}, 500, "Linear");
        swing1.chain(swing2);
        swing2.chain(swing3);
        swing3.chain(swing4);
        swing4.chain(swing5);
        swing5.chain(swing6);
        swing6.chain(swing7);
        swing1.start();
        
    },
    update: function()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/