let slot=[  0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
        ];
let score=0;
let score_up=0;
let score_down=0;
let score_left=0;
let score_right=0;
let previous_score=0;

let previous_slot=[];
let dummyslot_left=[];
let dummyslot_right=[];
let dummyslot_up=[];
let dummyslot_down=[];

let canmove_left=0;
let canmove_right=0;
let canmove_up=0;
let canmove_down=0;

let running=true;

let initialmove=[];

randomslot();
pushslot();
randomslot();
pushslot();

/*move_left();
pushslot();*/

function decision(){

    for(let i=0;i<16;i++)
    {
        previous_slot[i]=slot[i];
    }

    previous_score=score;

    let allmove=[];
    let allmovescore=[];

    for(let j=0;j<1000;j++) /*เพิ่ม ลด รอบ */
    {
        while(running)
        {
            choose_move();
            randomslot();
        }
        allmove.push(initialmove[0]);
        allmovescore.push(score);
        running=true;
        for(let i=0;i<16;i++)
        {
            slot[i]=previous_slot[i];
        }
        score=previous_score;
        initialmove=[];
    }

    let up=0;
    let count_up=0;
    let down=0;
    let count_down=0;
    let left=0;
    let count_left=0;
    let right=0;
    let count_right=0;

    for(let i=0;i<1000;i++) /*เพิ่ม ลด รอบ */
    {
        if(allmove[i]=='up')
        {
            up+=allmovescore[i];
            count_up++;
        }
        else if(allmove[i]=='down')
        {
            down+=allmovescore[i];
            count_down++;
        }
        else if(allmove[i]=='left')
        {
            left+=allmovescore[i];
            count_left++;
        }
        else if(allmove[i]=='right')
        {
            right+=allmovescore[i];
            count_right++;
        }
    }

    if(count_up==0)
    {
        up=0;
    }
    else{
        up=up/count_up;
    }

    if(count_down==0)
    {
        down=0;
    }
    else{
        down=down/count_down;
    }

    if(count_left==0)
    {
        left=0;
    }
    else{
        left=left/count_left;
    }

    if(count_right==0)
    {
        right=0;
    }
    else{
        right=right/count_right;
    }
 
    for(let i=0;i<16;i++)
    {
        slot[i]=previous_slot[i];
    }
    score=previous_score;

    console.log("up = "+up);
    console.log("down = "+down);
    console.log("left = "+left);
    console.log("right = "+right);

    if(up>=down && up>=left && up>=right && count_up>0)
    {
        score_up=0;
        score+=move_up();
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_up[i];
        }
        console.log("choose up");
        document.getElementById("choose").innerHTML="choose : up";
    }
    else if(down>=up && down>=left && down>=right && count_down>0)
    {
        score_down=0;
        score+=move_down();
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_down[i];
        }
        console.log("choose down");
        document.getElementById("choose").innerHTML="choose : down";
    }
    else if(left>=up && left>=down && left>=right && count_left>0)
    {
        score_left=0;
        score+=move_left();
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_left[i];
        }
        console.log("choose left");
        document.getElementById("choose").innerHTML="choose : left";
    }
    else if(right>=up && right>=left && right>=down && count_right>0)
    {
        score_right=0;
        score+=move_right();
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_right[i];
        }
        console.log("choose right");
        document.getElementById("choose").innerHTML="choose : right";
    }
    up=0;
    count_up=0;
    down=0;
    count_down=0;
    left=0;
    count_left=0;
    right=0;
    count_right=0;
}

setInterval(decision,500); /*500 คือ 0.5 วินาที */
setInterval(pushslot,500);
setInterval(showscore,500);
setInterval(randomslot,500);
setInterval(pushslot,500);


function randomslot(){
    let blank=[];
    for(let i=0;i<16;i++)
    {
        if(slot[i]==0)
        {
            blank.push(i);
        }
    }
    if(blank.length>0)
    {
        x=Math.floor(Math.random() * blank.length);
        slot[blank[x]]=(Math.floor(Math.random()*2)+1)*2;
    }
    else{
        running=false;
    }
}

function pushslot(){

    for(let i=0;i<16;i++)
    {
        if(slot[i]!=0)
        {
            document.getElementById(i).innerHTML="<h1>"+slot[i]+"</h1>";
        }
        else if(slot[i]==0)
        {
            document.getElementById(i).innerHTML="";
        }
        setcolor(slot[i],i);
    }
}

function setcolor(color,i){
    if(color==0)
    {
        document.getElementById(i).style.backgroundColor="#F2F4F4 ";
    }
    else if(color==2)
    {
        document.getElementById(i).style.backgroundColor="#eee4da ";
        document.getElementById(i).style.color="#776e65";
    }
    else if(color==4)
    {
        document.getElementById(i).style.backgroundColor="#ede0c8 ";
        document.getElementById(i).style.color="#776e65";
    }
    else if(color==8)
    {
        document.getElementById(i).style.backgroundColor="#f2b179 ";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==16)
    {
        document.getElementById(i).style.backgroundColor="#f59563 ";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==32)
    {
        document.getElementById(i).style.backgroundColor="#f67c5f";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==64)
    {
        document.getElementById(i).style.backgroundColor="#f65e3b";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==128)
    {
        document.getElementById(i).style.backgroundColor="#edcf72";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==256)
    {
        document.getElementById(i).style.backgroundColor="#edcc61";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==512)
    {
        document.getElementById(i).style.backgroundColor="#edc850";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==1024)
    {
        document.getElementById(i).style.backgroundColor="#edc53f";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else if(color==2048)
    {
        document.getElementById(i).style.backgroundColor="#edc53f";
        document.getElementById(i).style.color="#f9f6f2";
    }
    else{
        document.getElementById(i).style.backgroundColor="#F5B041";
        document.getElementById(i).style.color="#f9f6f2";
    }
}

function choose_move(){

    let left=move_left();
    let right=move_right();
    let up=move_up();
    let down=move_down();

    let state=[];
    
    if(canmove_left>0)
    {
        state.push('left');
    }
    if(canmove_right>0)
    {
        state.push('right');
    }
    if(canmove_up>0)
    {
        state.push('up');
    }
    if(canmove_down>0)
    {
        state.push('down');
    }

    
    let num=Math.floor(Math.random() * state.length);

    if(state[num]=='left' && state.length!=0)
    {
       // move_left();
        score+=left;
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_left[i];
        }
        initialmove.push('left');
    }
    else if(state[num]=='right' && state.length!=0)
    {
        //move_right();
        score+=right;
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_right[i];
        }
        initialmove.push('right');
    }
    else if(state[num]=='up' && state.length!=0)
    {
        //move_up();
        score+=up;
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_up[i];
        }
        initialmove.push('up');
    }
    else if(state[num]=='down' && state.length!=0){
        //move_down();
        score+=down;
        for(let i=0;i<16;i++)
        {
            slot[i]=dummyslot_down[i];
        }
        initialmove.push('down');
    }
    score_left=0;
    score_right=0;
    score_up=0;
    score_down=0;

    canmove_left=0;
    canmove_right=0;
    canmove_up=0;
    canmove_down=0;
    
}

function move_left(){

    for(let i=0;i<16;i++)
    {
        dummyslot_left[i]=slot[i];
    }

    let collision=0;
    let double_collision=0;

    for(let i=0;i<=12;i+=4)
    {
        if(dummyslot_left[i]==dummyslot_left[i+1] && dummyslot_left[i+2]==dummyslot_left[i+3] && dummyslot_left[i]>0 && dummyslot_left[i+1]>0 && dummyslot_left[i+2]>0 && dummyslot_left[i+3]>0)
        {
            canmove_left++;
            score_left+=dummyslot_left[i]*2;
            score_left+=dummyslot_left[i+2]*2;
            dummyslot_left[i]=dummyslot_left[i]*2;
            dummyslot_left[i+1]=dummyslot_left[i+2]*2;
            dummyslot_left[i+2]=0;
            dummyslot_left[i+3]=0;
            double_collision=1;
        }

        if(double_collision==0)
        {
            let k=i+1;
            if(dummyslot_left[k]>0)
            {
                if(dummyslot_left[k]==dummyslot_left[k-1] && collision==0)
                {
                    canmove_left++;
                    score_left+=dummyslot_left[k]*2;
                    dummyslot_left[k-1]=dummyslot_left[k-1]*2;
                    dummyslot_left[k]=0;
                    collision=1;
                }
                else if(dummyslot_left[k-1]==0)
                {
                    canmove_left++;
                    dummyslot_left[k-1]=dummyslot_left[k];
                    dummyslot_left[k]=0;
                }
            }

            k=i+2;
            if(dummyslot_left[k]>0)
            {
                if(dummyslot_left[k]==dummyslot_left[k-1] && collision==0)
                {
                    canmove_left++;
                    score_left+=dummyslot_left[k]*2;
                    dummyslot_left[k-1]=dummyslot_left[k-1]*2;
                    dummyslot_left[k]=0;
                    collision=1;
                }
                else if(dummyslot_left[k-1]==0 && dummyslot_left[k-2]==dummyslot_left[k] && collision==0)
                {
                    canmove_left++;
                    score_left+=dummyslot_left[k]*2;
                    dummyslot_left[k-2]=dummyslot_left[k-2]*2;
                    dummyslot_left[k]=0;
                    collision=1;
                }
                else if(dummyslot_left[k-1]==0 && (dummyslot_left[k-2]!=dummyslot_left[k] || collision==1) && dummyslot_left[k-2]>0)
                {
                    canmove_left++;
                    dummyslot_left[k-1]=dummyslot_left[k];
                    dummyslot_left[k]=0;
                }
                else if(dummyslot_left[k-1]==0 && dummyslot_left[k-2]==0)
                {
                    canmove_left++;
                    dummyslot_left[k-2]=dummyslot_left[k];
                    dummyslot_left[k]=0;
                }
            }
            
            k=i+3;
            if(dummyslot_left[k]>0)
            {
                if(dummyslot_left[k]==dummyslot_left[k-1] && collision==0)
                {
                    canmove_left++;
                    score_left+=dummyslot_left[k]*2;
                    dummyslot_left[k-1]=dummyslot_left[k-1]*2;
                    dummyslot_left[k]=0;
                    collision=1;
                }
                else if(dummyslot_left[k-1]==0 && dummyslot_left[k-2]==dummyslot_left[k] && collision==0)
                {
                    canmove_left++;
                    score_left+=dummyslot_left[k]*2;
                    dummyslot_left[k-2]=dummyslot_left[k-2]*2;
                    dummyslot_left[k]=0;
                    collision=1;
                }
                else if(dummyslot_left[k-1]==0 && (dummyslot_left[k-2]!=dummyslot_left[k] || collision==1) && dummyslot_left[k-2]>0)
                {
                    canmove_left++;
                    dummyslot_left[k-1]=dummyslot_left[k];
                    dummyslot_left[k]=0;
                }
                else if(dummyslot_left[k-1]==0 && dummyslot_left[k-2]==0 && dummyslot_left[k-3]==dummyslot_left[k] && collision==0)
                {
                    canmove_left++;
                    score_left+=dummyslot_left[k]*2;
                    dummyslot_left[k-3]=dummyslot_left[k-3]*2;
                    dummyslot_left[k]=0;
                    collision=1;
                }
                else if(dummyslot_left[k-1]==0 && dummyslot_left[k-2]==0 && (dummyslot_left[k-3]!=dummyslot_left[k] || collision==1) && dummyslot_left[k-3]>0)
                {
                    canmove_left++;
                    dummyslot_left[k-2]=dummyslot_left[k];
                    dummyslot_left[k]=0;
                }
                else if(dummyslot_left[k-1]==0 && dummyslot_left[k-2]==0 && dummyslot_left[k-3]==0)
                {
                    canmove_left++;
                    dummyslot_left[k-3]=dummyslot_left[k];
                    dummyslot_left[k]=0;
                }
            }
        }
        collision=0;
        double_collision=0;
    }

    /*for(let i=0;i<16;i++)
    {
        slot[i]=dummyslot_left[i];
    }*/

    return score_left;
}

function move_right(){

    for(let i=0;i<16;i++)
    {
        dummyslot_right[i]=slot[i];
    }

    let collision=0;
    let double_collision=0;

    for(let i=3;i<=15;i+=4)
    {
        if(dummyslot_right[i]==dummyslot_right[i-1] && dummyslot_right[i-2]==dummyslot_right[i-3] && dummyslot_right[i]>0 && dummyslot_right[i-1]>0 && dummyslot_right[i-2]>0 && dummyslot_right[i-3]>0)
        {
            canmove_right++;
            score_right+=dummyslot_right[i]*2;
            score_right+=dummyslot_right[i-2]*2;
            dummyslot_right[i]=dummyslot_right[i]*2;
            dummyslot_right[i-1]=dummyslot_right[i-2]*2;
            dummyslot_right[i-2]=0;
            dummyslot_right[i-3]=0;
            double_collision=1;
        }

        if(double_collision==0)
        {
            let k=i-1;
            if(dummyslot_right[k]>0)
            {
                if(dummyslot_right[k]==dummyslot_right[k+1] && collision==0)
                {
                    canmove_right++;
                    score_right+=dummyslot_right[k]*2;
                    dummyslot_right[k+1]=dummyslot_right[k+1]*2;
                    dummyslot_right[k]=0;
                    collision=1;
                }
                else if(dummyslot_right[k+1]==0)
                {
                    canmove_right++;
                    dummyslot_right[k+1]=dummyslot_right[k];
                    dummyslot_right[k]=0;
                }
            }

            k=i-2;
            if(dummyslot_right[k]>0)
            {
                if(dummyslot_right[k]==dummyslot_right[k+1] && collision==0)
                {
                    canmove_right++;
                    score_right+=dummyslot_right[k]*2;
                    dummyslot_right[k+1]=dummyslot_right[k+1]*2;
                    dummyslot_right[k]=0;
                    collision=1;
                }
                else if(dummyslot_right[k+1]==0 && dummyslot_right[k+2]==dummyslot_right[k] && collision==0)
                {
                    canmove_right++;
                    score_right+=dummyslot_right[k]*2;
                    dummyslot_right[k+2]=dummyslot_right[k+2]*2;
                    dummyslot_right[k]=0;
                    collision=1;
                }
                else if(dummyslot_right[k+1]==0 && (dummyslot_right[k+2]!=dummyslot_right[k] || collision==1) && dummyslot_right[k+2]>0)
                {
                    canmove_right++;
                    dummyslot_right[k+1]=dummyslot_right[k];
                    dummyslot_right[k]=0;
                }
                else if(dummyslot_right[k+1]==0 && dummyslot_right[k+2]==0)
                {
                    canmove_right++;
                    dummyslot_right[k+2]=dummyslot_right[k];
                    dummyslot_right[k]=0;
                }
            }

            k=i-3;
            if(dummyslot_right[k]>0)
            {
                if(dummyslot_right[k]==dummyslot_right[k+1] && collision==0)
                {
                    canmove_right++;
                    score_right+=dummyslot_right[k]*2;
                    dummyslot_right[k+1]=dummyslot_right[k+1]*2;
                    dummyslot_right[k]=0;
                    collision=1;
                }
                else if(dummyslot_right[k+1]==0 && dummyslot_right[k+2]==dummyslot_right[k] && collision==0)
                {
                    canmove_right++;
                    score_right+=dummyslot_right[k]*2;
                    dummyslot_right[k+2]=dummyslot_right[k+2]*2;
                    dummyslot_right[k]=0;
                    collision=1;
                }
                else if(dummyslot_right[k+1]==0 && (dummyslot_right[k+2]!=dummyslot_right[k] || collision==1) && dummyslot_right[k+2]>0)
                {
                    canmove_right++;
                    dummyslot_right[k+1]=dummyslot_right[k];
                    dummyslot_right[k]=0;
                }
                else if(dummyslot_right[k+1]==0 && dummyslot_right[k+2]==0 && dummyslot_right[k+3]==dummyslot_right[k] && collision==0)
                {
                    canmove_right++;
                    score_right+=dummyslot_right[k]*2;
                    dummyslot_right[k+3]=dummyslot_right[k+3]*2;
                    dummyslot_right[k]=0;
                    collision=1;
                }
                else if(dummyslot_right[k+1]==0 && dummyslot_right[k+2]==0 && (dummyslot_right[k+3]!=dummyslot_right[k] || collision==1) && dummyslot_right[k+3]>0)
                {
                    canmove_right++;
                    dummyslot_right[k+2]=dummyslot_right[k];
                    dummyslot_right[k]=0;
                }
                else if(dummyslot_right[k+1]==0 && dummyslot_right[k+2]==0 && dummyslot_right[k+3]==0)
                {
                    canmove_right++;
                    dummyslot_right[k+3]=dummyslot_right[k];
                    dummyslot_right[k]=0;
                }
            }
        }
        collision=0;
        double_collision=0;
    }

   /* for(let i=0;i<16;i++)
    {
        slot[i]=dummyslot_right[i];
    }*/
    return score_right;
}

function move_up(){

    for(let i=0;i<16;i++)
    {
        dummyslot_up[i]=slot[i];
    }

    let collision=0;
    let double_collision=0;

    for(let i=0;i<4;i++)
    {
        if(dummyslot_up[i]==dummyslot_up[i+4] && dummyslot_up[i+8]==dummyslot_up[i+12] && dummyslot_up[i]>0 && dummyslot_up[i+4]>0 && dummyslot_up[i+8]>0 && dummyslot_up[i+12]>0)
        {
            canmove_up++;
            score_up+=dummyslot_up[i]*2;
            score_up+=dummyslot_up[i+8]*2;
            dummyslot_up[i]=dummyslot_up[i]*2;
            dummyslot_up[i+4]=dummyslot_up[i+8]*2;
            dummyslot_up[i+8]=0;
            dummyslot_up[i+12]=0;
            double_collision=1;
        }

        /*ไม่เกิด double collision */

        if(double_collision==0)
        {
            let k=i+4;
            if(dummyslot_up[k]>0)
            { 
                if(dummyslot_up[k]==dummyslot_up[k-4] && collision==0)
                {
                    canmove_up++;
                    score_up+=dummyslot_up[k]*2;
                    dummyslot_up[k-4]=dummyslot_up[k-4]*2;
                    dummyslot_up[k]=0;
                    collision=1;
                }
                else if(dummyslot_up[k-4]==0)
                {
                    canmove_up++;
                    dummyslot_up[k-4]=dummyslot_up[k];
                    dummyslot_up[k]=0;
                }
            }

            k=i+8;
            if(dummyslot_up[k]>0)
            { 
                if(dummyslot_up[k]==dummyslot_up[k-4] && collision==0)
                {
                    canmove_up++;
                    score_up+=dummyslot_up[k]*2;
                    dummyslot_up[k-4]=dummyslot_up[k-4]*2;
                    dummyslot_up[k]=0;
                    collision=1;
                }
                else if(dummyslot_up[k-4]==0 && dummyslot_up[k-8]==dummyslot_up[k] && collision==0)
                {
                    canmove_up++;
                    score_up+=dummyslot_up[k]*2;
                    dummyslot_up[k-8]=dummyslot_up[k-8]*2;
                    dummyslot_up[k]=0;
                    collision=1;
                }
                else if(dummyslot_up[k-4]==0 && (dummyslot_up[k-8]!=dummyslot_up[k] || collision==1) && dummyslot_up[k-8]>0)
                {
                    canmove_up++;
                    dummyslot_up[k-4]=dummyslot_up[k];
                    dummyslot_up[k]=0;
                }
                else if(dummyslot_up[k-4]==0 && dummyslot_up[k-8]==0)
                {
                    canmove_up++;
                    dummyslot_up[k-8]=dummyslot_up[k];
                    dummyslot_up[k]=0;
                }
            }
           
            k=i+12;
            if(dummyslot_up[k]>0)
            { 
                if(dummyslot_up[k]==dummyslot_up[k-4] && collision==0)
                {
                    canmove_up++;
                    score_up+=dummyslot_up[k]*2;
                    dummyslot_up[k-4]=dummyslot_up[k-4]*2;
                    dummyslot_up[k]=0;
                    collision=1;
                }
                else if(dummyslot_up[k-4]==0 && dummyslot_up[k-8]==dummyslot_up[k] && collision==0)
                {
                    canmove_up++;
                    score_up+=dummyslot_up[k]*2;
                    dummyslot_up[k-8]=dummyslot_up[k-8]*2;
                    dummyslot_up[k]=0;
                    collision=1;
                }
                else if(dummyslot_up[k-4]==0 && (dummyslot_up[k-8]!=dummyslot_up[k] || collision==1) && dummyslot_up[k-8]>0)
                {
                    canmove_up++;
                    dummyslot_up[k-4]=dummyslot_up[k];
                    dummyslot_up[k]=0;
                }
                else if(dummyslot_up[k-4]==0 && dummyslot_up[k-8]==0 && dummyslot_up[k-12]==dummyslot_up[k] && collision==0)
                {
                    canmove_up++;
                    score_up+=dummyslot_up[k]*2;
                    dummyslot_up[k-12]=dummyslot_up[k-12]*2;
                    dummyslot_up[k]=0;
                    collision=1;
                }
                else if(dummyslot_up[k-4]==0 && dummyslot_up[k-8]==0 && (dummyslot_up[k-12]!=dummyslot_up[k] || collision==1) && dummyslot_up[k-12]>0)
                {
                    canmove_up++;
                    dummyslot_up[k-8]=dummyslot_up[k];
                    dummyslot_up[k]=0;
                }
                else if(dummyslot_up[k-4]==0 && dummyslot_up[k-8]==0 && dummyslot_up[k-12]==0)
                {
                    canmove_up++;
                    dummyslot_up[k-12]=dummyslot_up[k];
                    dummyslot_up[k]=0;
                }
            }
        }
        collision=0;
        double_collision=0;
    }
   /* for(let i=0;i<16;i++)
    {
        slot[i]=dummyslot_up[i];
    }*/
    return score_up;
}

function move_down(){

    for(let i=0;i<16;i++)
    {
        dummyslot_down[i]=slot[i];
    }

    let collision=0;
    let double_collision=0;

    for(let i=0;i<4;i++)
    {
        let k=15-i;

        if(dummyslot_down[k]==dummyslot_down[k-4] && dummyslot_down[k-8]==dummyslot_down[k-12] && dummyslot_down[k]>0 && dummyslot_down[k-4]>0 && dummyslot_down[k-8]>0 && dummyslot_down[k-12]>0)
        {
            score_down+=dummyslot_down[k]*2;
            score_down+=dummyslot_down[k-8]*2;
            dummyslot_down[k]=dummyslot_down[k]*2;
            dummyslot_down[k-4]=dummyslot_down[k-8]*2;
            dummyslot_down[k-8]=0;
            dummyslot_down[k-12]=0;
            double_collision=1;
            canmove_down++;
        }
        /*  ทุกอันต้อง
                canmove++
                check dummyslot_down[k]>0
            ทุกอันที่ชนต้อง
                check collition==0
                score_down+=??
                collision=1
        */
        if(double_collision==0)
        {
            /*row 3 */
            k=15-i-4;
            if(dummyslot_down[k]>0)
            {
                if(dummyslot_down[k]==dummyslot_down[k+4] && collision==0)
                {
                    canmove_down++;
                    score_down+=dummyslot_down[k]*2;
                    dummyslot_down[k+4]=dummyslot_down[k+4]*2;
                    dummyslot_down[k]=0;
                    collision=1;
                }
                else if(dummyslot_down[k+4]==0)
                {
                    canmove_down++;
                    dummyslot_down[k+4]=dummyslot_down[k];
                    dummyslot_down[k]=0;
                }
            }
            
            /*row 2 */
            k=15-i-8;
            if(dummyslot_down[k]>0)
            {
                if(dummyslot_down[k]==dummyslot_down[k+4] && collision==0)
                {
                    canmove_down++;
                    score_down+=dummyslot_down[k]*2;
                    dummyslot_down[k+4]=dummyslot_down[k+4]*2;
                    dummyslot_down[k]=0;
                    collision=1;
                }
                else if(dummyslot_down[k+4]==0 && dummyslot_down[k]==dummyslot_down[k+8] && collision==0)
                {
                    canmove_down++;
                    score_down+=dummyslot_down[k]*2;
                    dummyslot_down[k+8]=dummyslot_down[k+8]*2;
                    dummyslot_down[k]=0;
                    collision=1;
                }
                else if(dummyslot_down[k+4]==0 && (dummyslot_down[k]!=dummyslot_down[k+8] || collision==1) && dummyslot_down[k+8]>0)
                {
                    canmove_down++;
                    dummyslot_down[k+4]=dummyslot_down[k];
                    dummyslot_down[k]=0;
                }
                else if(dummyslot_down[k+4]==0 && dummyslot_down[k+8]==0)
                {
                    canmove_down++;
                    dummyslot_down[k+8]=dummyslot_down[k];
                    dummyslot_down[k]=0;
                }
            }
            
             /*row 1 */
            k=15-i-12;
            if(dummyslot_down[k]>0)
            {
                if(dummyslot_down[k]==dummyslot_down[k+4] && collision==0)
                {
                    canmove_down++;
                    score_down+=dummyslot_down[k]*2;
                    dummyslot_down[k+4]=dummyslot_down[k+4]*2;
                    dummyslot_down[k]=0;
                    collision=1;
                }
                else if(dummyslot_down[k+4]==0 && dummyslot_down[k]==dummyslot_down[k+8] && collision==0)
                {
                    canmove_down++;
                    score_down+=dummyslot_down[k]*2;
                    dummyslot_down[k+8]=dummyslot_down[k+8]*2;
                    dummyslot_down[k]=0;
                    collision=1;
                }
                else if(dummyslot_down[k+4]==0 && (dummyslot_down[k]!=dummyslot_down[k+8] || collision==1) && dummyslot_down[k+8]>0)
                {
                    canmove_down++;
                    dummyslot_down[k+4]=dummyslot_down[k];
                    dummyslot_down[k]=0;
                }
                else if(dummyslot_down[k+4]==0 && dummyslot_down[k+8]==0 && dummyslot_down[k]==dummyslot_down[k+12] && collision==0)
                {
                    canmove_down++;
                    score_down+=dummyslot_down[k]*2;
                    dummyslot_down[k+12]=dummyslot_down[k+12]*2;
                    dummyslot_down[k]=0;
                    collision=1;
                }
                else if(dummyslot_down[k+4]==0 && dummyslot_down[k+8]==0 && (dummyslot_down[k]!=dummyslot_down[k+12] || collision==1) && dummyslot_down[k+12]>0)
                {
                    canmove_down++;
                    dummyslot_down[k+8]=dummyslot_down[k];
                    dummyslot_down[k]=0;
                }
                else if(dummyslot_down[k+4]==0 && dummyslot_down[k+8]==0 && dummyslot_down[k+12]==0)
                {
                    canmove_down++;
                    dummyslot_down[k+12]=dummyslot_down[k];
                    dummyslot_down[k]=0;
                }
            }

        }
        /*reset collition */
        collision=0;
        double_collision=0;
    }
    /*test show */
    /*for(let i=0;i<16;i++)
    {
        slot[i]=dummyslot_down[i];
    }*/
    return score_down;
}

function showscore(){
    document.getElementById("score").innerHTML="Score : "+score;
}
