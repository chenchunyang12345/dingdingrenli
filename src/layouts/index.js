// import styles from './index.css';
import TabBar from '../components/tabbar/index'
// function BasicLayout() {
//   return (
//     <div className={styles.normal}> 
//       {this.props.children}
     
//     </div>
//   );
// }

// export default BasicLayout;

function BasicLayout(props) {
  return (
    <div>
    
      {props.children}
       {/* <TabBar path={props.path}/> */}
    </div>
  );
}

export default BasicLayout;

