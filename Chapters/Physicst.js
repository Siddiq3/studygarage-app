import React from 'react';
import ChapterActionListScreen from '../src/features/chapters/ChapterActionListScreen';

const Physicst = (props) => (
  <ChapterActionListScreen
    {...props}
    title="Physical Science (Telugu) Video Explanations"
    subtitle="Open any chapter to continue learning"
    items={[
      { label: '1. ఉష్ణం', screen: '1st' },
      { label: '2. ఆమ్లాలు-క్షారాలు-లవణాలు', screen: '2nd' },
      { label: '3. సమతల ఉపరితలాల వద్ద కాంతి వక్రీభవనం', screen: '3rd' },
      { label: '4. వక్రతలాల వద్ద కాంతి వక్రీభవనం', screen: '4th' },
      { label: '5. మానవుని కన్ను-రంగుల ప్రపంచం', screen: '5th' },
      { label: '6. పరమాణు నిర్మాణం', screen: '6th' },
      { label: '7. మూలకాల వర్గీకరణ – ఆవర్తన పట్టిక', screen: '7th' },
      { label: '8. రసాయన బంధం', screen: '8th' },
      { label: '9. విద్యుత్ ప్రవాహం', screen: '9th' },
      { label: '10. విద్యుదయస్కాంతత్వం', screen: '10th' },
      { label: '11. లోహ సంగ్రహణ శాస్త్రం', screen: '11th' },
      { label: '12. కార్బన్– దాని సమ్మేళనాలు', screen: '12th' },
    ]}
  />
);

export default Physicst;
