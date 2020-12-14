type PlainObject = { [name:string]:any }
type AddPrefix<Prefix, Keys> = Prefix extends "" ? Keys: `${Prefix & string}.${Keys & string}`
type DeepState<State,Prefix> = {
   [K in keyof State]: State[K] extends PlainObject ? (AddPrefix<Prefix, K> | DeepState<State[K],AddPrefix<Prefix,K>>) : AddPrefix<Prefix, K>;
}[keyof State]  
interface Options<S>{
  (args:DeepState<S,"">) : any
  (args:DeepState<S,"">,type: "normal"|"event"  ) : any
  (args:DeepState<S,"">,transform:(...args:any[]) => any) : any
}
function useState<S>(state:S):{options:Options<S>} {
  function options(args:any){
    console.log(args)
    console.log(state)
  }
  return {
    options
  }  as any
} 
const state = {
  user:{
    name:"",
    age:12,
    recod:[],
    address:{
      city:{
        name:{
          CN:""
        }
      }
    }
  },
  hello:{
    world:""
  }
}
const { options } = useState<typeof state & {glass:{name:""}}>(state as any)



// options("us")
options("user.address.city.name")
options("hello.world")
options("glass.name")