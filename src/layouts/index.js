import styles from './index.css';
import TabBar from '../components/tabbar/index'
function BasicLayout(props) {
  return (
    <div className={styles.normal}> 
      {props.children}
      {/* <TabBar path={props.path}/> */}
    </div>
  );
}

export default BasicLayout;
