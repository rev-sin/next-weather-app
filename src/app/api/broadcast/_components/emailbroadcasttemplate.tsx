import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const emailbroadcasttemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>
      Alert: There is an earthquake in the locality. Please stay safe and follow
      the safety guidelines.
    </p>
    <p>
      We understand that this is a difficult time for you and your loved ones.
      It is important to stay calm and follow the instructions provided by the
      local authorities. Here are some safety tips to help you stay safe during
      an earthquake:
    </p>
    <ul>
      <li>
        Drop, Cover, and Hold On: Drop to your hands and knees, cover your head
        and neck, and hold on to something sturdy.
      </li>
      <li>
        Stay Indoors: If you are indoors, stay there. Move away from windows,
        glass, and heavy objects that could fall.
      </li>
      <li>
        Find a Safe Spot: Get under a sturdy piece of furniture, such as a table
        or desk, and hold on until the shaking stops.
      </li>
      <li>
        Stay Away from Buildings: If you are outside, move away from buildings,
        streetlights, and utility wires.
      </li>
      <li>
        Be Prepared for Aftershocks: After the initial shaking stops, be
        prepared for aftershocks. These can be just as dangerous as the main
        quake.
      </li>
    </ul>
    <p>
      In addition to these safety tips, it is important to have an emergency kit
      prepared. Your emergency kit should include items such as water,
      non-perishable food, a flashlight, batteries, a first aid kit, and any
      necessary medications. Make sure to have enough supplies to last for at
      least 72 hours.
    </p>
    <p>
      Communication is also key during an emergency. Make sure to have a plan in
      place to contact your loved ones and let them know you are safe. Keep your
      phone charged and have a backup power source if possible. If you are
      unable to make a phone call, try sending a text message or using social
      media to communicate.
    </p>
    <p>
      We are here to support you during this time. If you need assistance,
      please do not hesitate to reach out to us. Our team is available 24/7 to
      provide you with the help and resources you need. Stay safe, and remember
      that we are all in this together.
    </p>
    <p>
      Sincerely,
      <br />
      The NextWeather Team
    </p>
  </div>
);

export default emailbroadcasttemplate;
