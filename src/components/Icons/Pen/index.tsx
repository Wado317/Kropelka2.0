import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../../const/colors';

const Pen = () => (
  <Svg width="44" height="40" fill={colors.green} viewBox="-2 0 33 27">
    <Path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
  </Svg>
);

export default Pen;
