function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

class QueueElement{
    constructor(priority, state, solution)
    {
        this.priority = priority;
        this.state = state;
        this.solution = solution;
    }
}

class PriorityQueue{}{
    constructor()
    {
        this.items = [];
    }

    push(priority, state, solution)
    {
        var qele = new QueueElement(priority, state, solution);
    }
}


class Grid{
    state = [1,2,3,4,5,6,7,8,0];
    initial_state=[1,2,3,4,5,6,7,8,0];

    constructor()
    {
        while(this.isSolvable()===false || this.isSolved()===true)
        {
            this.state = shuffle(this.state);
        }
        
        for(var i=0; i<this.state.length; i++)
        {
            this.initial_state[i]=this.state[i];
        }
    }

    isSolvable()
    {
        var invs=0;
        for(var i=0; i<this.state.length; i++)
        {
            if(this.state[i]==0)
            {
                continue;
            }

            var inv=this.state[i]-1;
            for(var j=0; j<i; j++)
            {
                if(this.state[j]==0) continue;
                if(this.state[j] < this.state[i]) inv--;
            }

            invs+=inv;
        }

        if(invs%2==0) return true;
        return false;
    }

    isSolved()
    {
        var ans=true;

        for(var i=0; i<8; i++)
        {
            if(this.state[i]===i+1)
            {
                continue;
            }
            return false;
        }

        return this.state[8]==0;
    }

    move(index)
    {
        var dirx=[-1, 0, 1, 0]
        var diry=[0, -1, 0, 1]

        var x=Math.floor(index/3);
        var y=index%3;

        for(var i=0; i<4; i++)
        {
            var a=x+dirx[i];
            var b=y+diry[i];

            if(a<0 || b<0 || a>=3 || b>=3)
            {
                continue;
            }

            if(this.state[a*3+b]==0)
            {
                var tmp=this.state[index];
                this.state[index]=this.state[3*a+b];
                this.state[3*a+b]=tmp;
                break;
            }
        }
    }

    reset()
    {
        for(var i=0; i<9; i++)
        {
            this.state[i]=this.initial_state[i];
        }
    }

    heuristic_func(currState)
    {
        var score=0;

        for(var i=0; i<9; i++)
        {
            var goal_index;
            if(currState[i]==0)
            {
                goal_index=8;
            }
            else
            {
                goal_index=currState[i]-1;
            }

            score += Math.abs(Math.floor(goal_index/3) - Math.floor(i/3)) + Math.abs(goal_index%3 - i%3);
        }

        return score;
    }


    hint()
    {
        var dirx=[-1, 0, 1, 0];
        var diry=[0, -1, 0, 1];

        var solution = this.solve();
        
        var zero;
        for(var i=0; i<9; i++)
        {
            if(this.state[i]==0)
            {
                zero=i;
            }
        }

        var a=Math.floor(zero/3)+dirx[solution[0]]+'';
        var b=zero%3+diry[solution[0]]+'';

        document.getElementById(a+b).style.backgroundColor="rgba(51, 170, 51,  0.5)";
    }

    solve(){
        return [2];
    }
    // solve()
    // {
    //     var dirx=[-1, 0, 1, 0]
    //     var diry=[0, -1, 0, 1]

    //     var visited = new Set();
    //     var pq = new PriorityQueue();
        
    //     var currState = [];
    //     for(var i=0; i<9; i++) currState[i]=this.state[i];
    //     pq.push(this.heuristic_func(currState), currState);
       
    //     while(pq.empty()==false)
    //     {
    //         var tmpState=pq.top();

    //         if(visited.has(tmpState)) continue;
    //         visited.add(tmpState);

    //         if(this.isSolved())
    //         {
                
    //         }

    //         var zero;
    //         for(var i=0; i<9; i++)
    //         {
    //             if(tmpState[i]==0)
    //             {
    //                 zero=i;
    //             }
    //         }

            
    //         for(var j=0; j<4; j++)
    //         {
    //             var nextState;
    //             var a=Math.floor(zero/3)+dirx[j];
    //             var b=zero%3+diry[j];

    //             if(a<0 || b<0 || a>=3 || b>=3)
    //             {
    //                 continue;
    //             }

    //             for(var i=0; i<9; i++) nextState[i]=tmpState[i];
                
    //             nextState[zero]=nextState[3*a+b];
    //             nextState[3*a+b]=0;

    //             pq.push(this.heuristic_func(nextState), nextState);
    //         }
    //     }
    // }
}

class Game{
    grid;

    constructor()
    {
        this.grid = new Grid();
        this.render();

        for(var i=0; i<9; i++)
        {
            var f=Math.floor(i/3)+'';
            var s=i%3+'';

            document.getElementById(f+s).addEventListener("click", (ele) => {    
                var index = (+ele.srcElement.id[0])*3+(+ele.srcElement.id[1]);
                this.grid.move(index);
                this.render();
            });
        }    
        
        document.getElementById("reset").addEventListener("click", () =>{
            this.grid.reset();
            this.render();
        });

        document.getElementById("hint").addEventListener("click", () =>{
            this.grid.hint();
            this.render();
        });
    }

    render()
    {
        for(var i=0; i<9; i++)
        {
            var f=Math.floor(i/3)+'';
            var s=i%3+'';
            if(this.grid.state[i] === 0)
            {
                document.getElementById(f+s).innerHTML='';
                document.getElementById(f+s).style.backgroundColor="#cfcfcf";     
            }
            else
            {
                document.getElementById(f+s).innerHTML=this.grid.state[i];     
            }         
        }

        if(this.grid.isSolved())
        {
            document.getElementById("message").style.display="block";
            document.getElementById("reset").style.display="none";
            document.getElementById("hint").style.display="none";    
        }
    }


}

game = new Game();

document.getElementById("newGame").addEventListener("click", () =>{
    game = new Game();
    document.getElementById("reset").style.display = "block";
    document.getElementById("hint").style.display = "block";
});

