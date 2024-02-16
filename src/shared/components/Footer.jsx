import { isLoggedIn } from "../../firebase.config";

export default function Footer(props) {
  const { withoutLoginPage, isLogin } = props;
  if (window.matchMedia("(display-mode: standalone)").matches) return <></>;
  return (
    <>
      {!isLogin && <div class="mt-32" />}
      <footer
        class={`
        grid grid-cols-3
        p-4 pb-8 mt-auto
        w-screen rtl
        text-zinc-800 dark:text-zinc-50
        border-zinc-400 border-t dark:border-zinc-700
        dark:bg-zinc-700`}
      >
        <svg
          class="
          w-32
          inline-block
          cursor-pointer self-center"
          viewBox="0 0 495 203"
          fill="none"
          onClick={() => (location = "/")}
        >
          <g clip-path="url(#clip0_14_2)">
            <g>
              <path
                d="M483.193 11.5208C468.109 -3.72916 449.354 3.00521 434.531 14.6458C429.188 18.8438 390.573 55.5885 392.297 57.0573L403.427 66.5313L390.406 59.3646C361.01 95.3646 332.464 141.01 335.385 155.484C335.385 155.484 357.344 164.526 388.911 142.682C390.938 141.276 393.406 139.458 396.25 137.286L385.193 125.797L399.823 134.521C418.943 119.536 450.917 91.9115 480.125 63.1875C480.745 62.651 481.344 62.0833 481.932 61.4948C482.359 61.0573 482.781 60.6094 483.182 60.151C485.26 58.1042 487.318 56.0521 489.344 53.9948C489.344 53.9948 489.333 53.9844 489.323 53.9531L488.302 52.9219C495.661 39.401 494.047 22.5052 483.193 11.5208Z"
                class="fill-zinc-50"
              />
              <path
                d="M483.193 11.521C468.109 -3.72895 449.354 3.00542 434.531 14.646C429.187 18.844 390.573 55.5887 392.297 57.0575L403.427 66.5314L390.406 59.3648C361.01 95.3647 332.464 141.011 335.385 155.484C335.385 155.484 357.344 164.526 388.911 142.682C390.937 141.276 393.406 139.458 396.25 137.287L385.193 125.797L399.823 134.521C418.943 119.537 450.917 91.9116 480.125 63.1877C480.745 62.6512 481.344 62.0835 481.932 61.495C482.359 61.0575 482.781 60.6095 483.182 60.1512C485.26 58.1043 487.318 56.0523 489.344 53.995C489.344 53.995 489.333 53.9846 489.323 53.9533L488.302 52.922C495.661 39.4012 494.047 22.5054 483.193 11.521Z"
                stroke="#25272E"
                class="dark:!stroke-zinc-700"
                stroke-width="3.95787"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M291.25 200.083C291.25 200.083 331.37 164.5 369.917 128.641L364.682 123.198C330.813 157.135 297.057 192.646 291.25 200.083Z"
                class="fill-zinc-50"
              />
              <g>
                <mask
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="289"
                  y="120"
                  width="84"
                  height="83"
                >
                  <g>
                    <path
                      d="M289.099 120.333H372.667V202.313H289.099V120.333Z"
                      class="fill-zinc-50"
                    />
                  </g>
                </mask>
                <g mask="url(#mask0_14_2)">
                  <g>
                    <path
                      d="M291.25 200.083C291.25 200.083 331.37 164.5 369.917 128.641L364.682 123.198C330.812 157.136 297.057 192.646 291.25 200.083Z"
                      stroke="#25272E"
                      class="dark:!stroke-zinc-700"
                      stroke-width="3.95787"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
              </g>
              <path
                d="M379.953 108.016C379.583 108.375 379.229 108.734 378.854 109.104C378.656 109.292 378.458 109.49 378.266 109.677C377.88 110.057 377.484 110.443 377.104 110.823C376.943 110.984 376.766 111.151 376.609 111.323C376.208 111.719 375.802 112.115 375.391 112.516C375.234 112.682 375.062 112.844 374.906 113C374.516 113.401 374.109 113.797 373.708 114.198C373.531 114.365 373.365 114.536 373.187 114.693C372.75 115.141 372.307 115.578 371.865 116.016L371.542 116.344C371.068 116.813 370.589 117.292 370.104 117.766C370.016 117.865 369.917 117.958 369.818 118.057C369.307 118.573 368.786 119.083 368.276 119.599L368.125 119.75C367.557 120.313 366.984 120.88 366.417 121.458C365.833 122.036 365.255 122.615 364.682 123.198L369.917 128.641C375.536 123.427 381.109 118.203 386.521 113.083C386.542 113.073 386.557 113.052 386.568 113.042C387.062 112.573 387.542 112.115 388.036 111.661C388.094 111.599 388.151 111.542 388.224 111.479C388.667 111.063 389.099 110.646 389.531 110.224C389.651 110.125 389.755 110.016 389.865 109.917C390.276 109.521 390.703 109.13 391.115 108.734C391.245 108.604 391.37 108.495 391.5 108.365C391.88 108 392.266 107.641 392.651 107.271C392.807 107.115 392.964 106.964 393.125 106.813C393.495 106.464 393.849 106.12 394.214 105.781C394.38 105.609 394.557 105.453 394.729 105.281C395.089 104.932 395.453 104.583 395.818 104.245C395.984 104.089 396.135 103.938 396.302 103.792C396.656 103.453 397 103.115 397.354 102.776C397.531 102.594 397.708 102.427 397.885 102.255C398.229 101.927 398.583 101.589 398.927 101.26C399.089 101.104 399.255 100.943 399.422 100.786C399.755 100.469 400.089 100.135 400.422 99.8177C400.609 99.6302 400.807 99.4531 400.995 99.2604C401.312 98.9531 401.635 98.6458 401.948 98.3386C402.125 98.1667 402.312 97.9896 402.49 97.8177C402.807 97.5104 403.13 97.1927 403.453 96.875C403.63 96.6979 403.828 96.5261 404.005 96.349C404.323 96.0469 404.625 95.7396 404.943 95.4323L405.474 94.9271C405.786 94.6146 406.094 94.3177 406.406 94.0104C406.583 93.8386 406.76 93.6615 406.948 93.474C407.245 93.1823 407.547 92.8958 407.844 92.599C408.031 92.4167 408.208 92.2396 408.396 92.0573C408.693 91.7708 408.974 91.4948 409.271 91.1927C409.448 91.0156 409.635 90.8438 409.812 90.6667C410.109 90.3802 410.391 90.099 410.677 89.8229L411.198 89.2917C411.495 89.0052 411.781 88.724 412.068 88.4375C412.234 88.2708 412.401 88.1094 412.568 87.9479C412.854 87.6615 413.141 87.375 413.422 87.0938L413.927 86.5886C414.203 86.3177 414.479 86.0417 414.75 85.7708C414.927 85.5938 415.099 85.4115 415.281 85.2448C415.542 84.974 415.797 84.7292 416.052 84.4583C416.229 84.2917 416.385 84.1198 416.552 83.9531C416.818 83.6927 417.083 83.4219 417.359 83.1563C417.5 83.0156 417.625 82.875 417.771 82.7396C418.047 82.4479 418.323 82.1719 418.609 81.8802C418.74 81.7448 418.875 81.6146 419.005 81.474C419.281 81.1927 419.562 80.9167 419.839 80.6354C419.937 80.5365 420.036 80.4375 420.135 80.3281C421.12 79.3125 422.083 78.3281 423.021 77.3542L423.323 77.0469C423.542 76.8177 423.755 76.599 423.964 76.3802C424.12 76.2188 424.286 76.0521 424.448 75.8802C424.641 75.6823 424.828 75.474 425.026 75.2761C425.193 75.099 425.359 74.9167 425.526 74.7396C425.724 74.5417 425.901 74.3281 426.099 74.1302C426.255 73.974 426.411 73.8021 426.573 73.6354C426.75 73.4427 426.937 73.2448 427.12 73.0573C427.271 72.8854 427.427 72.7188 427.583 72.5469C427.76 72.3594 427.937 72.1823 428.104 71.9844C428.255 71.8229 428.411 71.6615 428.568 71.4948C428.734 71.3073 428.896 71.125 429.062 70.9583C429.219 70.7865 429.365 70.6198 429.521 70.4479C429.682 70.2813 429.828 70.1094 429.984 69.9427C430.135 69.7761 430.292 69.6146 430.427 69.4531C430.578 69.2865 430.734 69.1146 430.87 68.9479C431.031 68.7865 431.167 68.6406 431.302 68.4792C431.443 68.3125 431.589 68.1615 431.729 68.0052C431.865 67.8438 432.01 67.6823 432.141 67.5261C432.276 67.3854 432.417 67.2292 432.542 67.0781C432.682 66.9167 432.812 66.7708 432.937 66.6198C433.068 66.4688 433.193 66.3229 433.323 66.1719C433.448 66.0313 433.578 65.8854 433.698 65.7448C433.823 65.5938 433.943 65.4479 434.057 65.3073C434.187 65.1667 434.307 65.0261 434.411 64.8906C434.531 64.75 434.641 64.6094 434.76 64.4792C434.875 64.3438 434.984 64.2031 435.104 64.0625C435.214 63.9323 435.307 63.8125 435.406 63.6771C435.526 63.5469 435.625 63.4063 435.745 63.2761C435.833 63.1563 435.927 63.0365 436.016 62.9115C436.125 62.7917 436.224 62.6615 436.323 62.5313C436.422 62.4115 436.51 62.2917 436.599 62.1823C436.687 62.0521 436.786 61.9323 436.875 61.8125C436.964 61.7031 437.042 61.5938 437.13 61.474C437.219 61.3646 437.297 61.2552 437.375 61.1354C437.464 61.0261 437.531 60.9167 437.615 60.8177C437.693 60.7083 437.76 60.599 437.839 60.4896C437.906 60.3802 437.974 60.2813 438.047 60.1927C438.125 60.0833 438.182 59.974 438.25 59.875C438.323 59.7865 438.38 59.6979 438.437 59.6042C438.5 59.4948 438.568 59.4063 438.625 59.3073C438.682 59.2292 438.734 59.1302 438.781 59.0469C438.844 58.9583 438.891 58.8594 438.948 58.7813C438.99 58.6979 439.036 58.6094 439.078 58.5417C439.13 58.4531 439.177 58.3646 439.219 58.2813C439.255 58.2136 439.307 58.1354 439.323 58.0625C439.375 57.9844 439.401 57.9063 439.443 57.8229C439.474 57.7656 439.51 57.6979 439.521 57.625C439.562 57.5573 439.589 57.4844 439.62 57.4063C439.641 57.349 439.661 57.2865 439.677 57.2396C439.708 57.1563 439.719 57.0886 439.74 57.0208C439.755 56.9792 439.766 56.9271 439.776 56.8802C439.786 56.8125 439.797 56.7396 439.807 56.6823C439.807 56.6406 439.818 56.6094 439.818 56.5729C439.828 56.474 439.828 56.3906 439.818 56.3021C439.797 56.224 439.776 56.1458 439.755 56.0833C439.75 56.0625 439.719 56.0417 439.708 56.0261C439.687 55.9844 439.667 55.9427 439.641 55.9063C439.62 55.8958 439.589 55.8854 439.573 55.8646C439.552 55.8333 439.51 55.8177 439.474 55.7969C439.453 55.7865 439.422 55.7865 439.385 55.7656C439.354 55.7552 439.307 55.7448 439.266 55.724H439.01C438.969 55.724 438.911 55.7448 438.87 55.7448C438.812 55.7552 438.766 55.7656 438.703 55.7865C438.646 55.7865 438.589 55.8073 438.547 55.8177C438.479 55.8333 438.417 55.8542 438.339 55.8854C438.292 55.8958 438.234 55.9271 438.161 55.9323C438.094 55.9636 438.026 55.9948 437.958 56.0365C437.885 56.0521 437.818 56.0833 437.75 56.125C437.672 56.1511 437.583 56.1927 437.505 56.2344C437.427 56.2604 437.354 56.3021 437.286 56.3333C437.198 56.3906 437.109 56.4323 437.021 56.4844C436.932 56.5313 436.854 56.5729 436.776 56.6094C436.687 56.6719 436.589 56.7292 436.479 56.7813C436.401 56.8386 436.312 56.8802 436.224 56.9375C436.125 57.0104 436.016 57.0677 435.911 57.1302C435.823 57.1875 435.724 57.25 435.625 57.3073C435.526 57.3854 435.406 57.4583 435.302 57.5261C435.203 57.5938 435.104 57.6563 435.005 57.724C434.875 57.8073 434.76 57.8958 434.641 57.974C434.531 58.0417 434.432 58.1146 434.323 58.1927C434.198 58.2708 434.068 58.3698 433.932 58.474C433.833 58.5417 433.724 58.6198 433.609 58.6979L433.193 59C433.083 59.0886 432.979 59.1563 432.859 59.2552C432.724 59.3594 432.562 59.4688 432.417 59.5833C432.297 59.6771 432.182 59.7656 432.062 59.8438C431.917 59.974 431.745 60.0938 431.589 60.2136C431.479 60.3125 431.365 60.3906 431.234 60.4896C431.068 60.6198 430.901 60.7604 430.714 60.9011C430.604 60.9896 430.495 61.0781 430.37 61.1667C430.193 61.3073 430.005 61.4688 429.818 61.6146C429.698 61.7031 429.594 61.8021 429.464 61.8958C429.266 62.0625 429.052 62.2448 428.833 62.4115C428.734 62.4896 428.635 62.5781 428.542 62.6615C427.901 63.1771 427.24 63.724 426.562 64.2917C426.443 64.4011 426.323 64.4896 426.219 64.5886C425.99 64.7917 425.766 64.9792 425.526 65.1771C425.38 65.3073 425.245 65.4167 425.094 65.5469C424.88 65.724 424.661 65.9115 424.448 66.1042C424.297 66.2344 424.161 66.349 424.01 66.4688C423.786 66.6719 423.568 66.849 423.354 67.0469C423.187 67.1875 423.026 67.3281 422.87 67.474C422.646 67.6563 422.437 67.8542 422.224 68.0313C422.052 68.1823 421.875 68.3386 421.698 68.4792C421.495 68.6771 421.276 68.8698 421.062 69.0573C420.885 69.2188 420.708 69.3646 420.531 69.5365C420.312 69.724 420.089 69.9219 419.87 70.1094C419.682 70.2813 419.505 70.4427 419.328 70.599C419.104 70.7969 418.875 70.9948 418.651 71.2083C418.464 71.3646 418.276 71.5469 418.078 71.7031C417.854 71.9115 417.635 72.1198 417.401 72.3229C417.214 72.4896 417.026 72.6615 416.839 72.8386C416.594 73.0573 416.354 73.2656 416.109 73.4948C415.932 73.6563 415.745 73.8229 415.568 73.9896C415.312 74.2188 415.068 74.4479 414.823 74.6667C414.625 74.8594 414.427 75.0261 414.229 75.2083C413.995 75.4271 413.76 75.6458 413.51 75.875C413.307 76.0521 413.099 76.25 412.891 76.4375C412.656 76.6563 412.411 76.875 412.167 77.1042C411.958 77.3073 411.74 77.4948 411.536 77.6927C411.276 77.9219 411.031 78.1615 410.776 78.4011C410.578 78.5781 410.375 78.7656 410.177 78.9479C409.911 79.2031 409.625 79.4531 409.359 79.7136C409.161 79.8906 408.964 80.0729 408.771 80.2708C408.495 80.5208 408.219 80.7761 407.943 81.0365C407.745 81.224 407.547 81.4063 407.344 81.5938C407.057 81.8594 406.76 82.1302 406.484 82.4115C406.292 82.5886 406.094 82.7656 405.906 82.9583C405.599 83.2344 405.307 83.5052 405.01 83.7917C404.812 83.9688 404.625 84.1511 404.437 84.3281C404.104 84.6354 403.771 84.9583 403.448 85.2761C403.286 85.4115 403.12 85.5729 402.974 85.724C402.578 86.0886 402.187 86.4583 401.802 86.8386C401.682 86.9375 401.578 87.0365 401.469 87.1458C401.036 87.5521 400.599 87.9688 400.156 88.3906C400.089 88.4583 400.01 88.5261 399.943 88.6094C398.906 89.5833 397.875 90.5781 396.823 91.5938C396.724 91.6823 396.625 91.7708 396.536 91.8698C396.104 92.2761 395.682 92.6875 395.25 93.0938C395.12 93.224 394.995 93.3438 394.854 93.474C394.453 93.8698 394.047 94.25 393.646 94.6563C393.526 94.7656 393.406 94.8854 393.292 94.9948C392.875 95.4011 392.464 95.7917 392.042 96.1979C391.891 96.3386 391.745 96.4844 391.599 96.6354C391.214 97.0052 390.828 97.3698 390.448 97.75C390.276 97.9115 390.099 98.0886 389.932 98.25C389.562 98.6042 389.177 98.974 388.802 99.3438C388.635 99.5 388.458 99.6719 388.292 99.8386C387.927 100.198 387.562 100.557 387.187 100.917C386.99 101.104 386.807 101.292 386.609 101.479C386.245 101.828 385.891 102.188 385.526 102.547C385.339 102.724 385.151 102.906 384.964 103.094C384.599 103.443 384.234 103.807 383.87 104.167C383.687 104.349 383.51 104.526 383.323 104.693C382.937 105.073 382.562 105.453 382.182 105.818C382 105.99 381.823 106.167 381.656 106.344C381.266 106.714 380.901 107.094 380.516 107.458C380.318 107.641 380.141 107.828 379.953 108.016Z"
                class="fill-zinc-50"
              />
              <path
                d="M379.953 108.016C379.583 108.375 379.229 108.735 378.854 109.104C378.656 109.292 378.458 109.49 378.266 109.677C377.88 110.057 377.484 110.443 377.104 110.823C376.943 110.985 376.766 111.151 376.609 111.323C376.208 111.719 375.802 112.115 375.391 112.516C375.234 112.682 375.062 112.844 374.906 113C374.516 113.401 374.109 113.797 373.708 114.198C373.531 114.365 373.365 114.537 373.187 114.693C372.75 115.141 372.307 115.578 371.865 116.016L371.542 116.344C371.068 116.813 370.589 117.292 370.104 117.766C370.016 117.865 369.917 117.958 369.818 118.057C369.307 118.573 368.786 119.083 368.276 119.599L368.125 119.75C367.557 120.313 366.984 120.88 366.417 121.458C365.833 122.037 365.255 122.615 364.682 123.198L369.917 128.641C375.536 123.427 381.109 118.203 386.521 113.083C386.542 113.073 386.557 113.052 386.568 113.042C387.062 112.573 387.542 112.115 388.036 111.662C388.094 111.599 388.151 111.542 388.224 111.479C388.667 111.063 389.099 110.646 389.531 110.224C389.651 110.125 389.755 110.016 389.865 109.917C390.276 109.521 390.703 109.13 391.115 108.735C391.245 108.604 391.37 108.495 391.5 108.365C391.88 108 392.266 107.641 392.651 107.271C392.807 107.115 392.963 106.964 393.125 106.813C393.495 106.464 393.849 106.12 394.214 105.781C394.38 105.61 394.557 105.453 394.724 105.281C395.088 104.932 395.453 104.583 395.818 104.245C395.984 104.089 396.135 103.938 396.302 103.792C396.656 103.453 397 103.115 397.354 102.776C397.531 102.594 397.708 102.427 397.885 102.255C398.229 101.927 398.583 101.589 398.927 101.261C399.089 101.104 399.255 100.943 399.422 100.787C399.755 100.469 400.089 100.141 400.422 99.8179C400.609 99.6304 400.807 99.4533 400.995 99.2606C401.312 98.9533 401.635 98.646 401.948 98.3387C402.125 98.1668 402.312 97.9897 402.49 97.8179C402.807 97.5106 403.13 97.1929 403.453 96.8752C403.63 96.6981 403.828 96.5262 404.005 96.3491C404.323 96.047 404.625 95.7397 404.943 95.4324L405.474 94.9272C405.786 94.6147 406.094 94.3179 406.406 94.0106C406.583 93.8387 406.76 93.6616 406.948 93.4741C407.245 93.1824 407.547 92.896 407.844 92.5991C408.031 92.4168 408.208 92.2397 408.396 92.0574C408.693 91.771 408.974 91.4949 409.271 91.1929C409.448 91.0158 409.635 90.8439 409.812 90.6668C410.109 90.3804 410.391 90.0991 410.677 89.8231L411.198 89.2918C411.495 89.0053 411.781 88.7241 412.068 88.4376C412.234 88.271 412.401 88.1095 412.568 87.9481C412.854 87.6616 413.141 87.3751 413.422 87.0939L413.927 86.5887C414.203 86.3179 414.479 86.0418 414.75 85.771C414.927 85.5939 415.099 85.4116 415.281 85.2449C415.542 84.9741 415.797 84.7293 416.052 84.4585C416.229 84.2918 416.385 84.1199 416.552 83.9533C416.818 83.6929 417.083 83.422 417.359 83.1564C417.5 83.0158 417.625 82.8751 417.771 82.7397C418.047 82.4481 418.323 82.172 418.609 81.8804C418.74 81.7449 418.875 81.6147 419.005 81.4741C419.281 81.1929 419.562 80.9168 419.838 80.6356C419.937 80.5366 420.036 80.4377 420.135 80.3283C421.12 79.3127 422.083 78.3283 423.021 77.3543L423.323 77.047C423.542 76.8179 423.755 76.5991 423.963 76.3804C424.12 76.2189 424.286 76.0522 424.448 75.8804C424.641 75.6824 424.828 75.4741 425.026 75.2762C425.193 75.0991 425.359 74.9168 425.526 74.7397C425.724 74.5418 425.901 74.3283 426.099 74.1304C426.255 73.9741 426.411 73.8022 426.573 73.6356C426.75 73.4429 426.937 73.2449 427.12 73.0574C427.271 72.8856 427.427 72.7189 427.583 72.547C427.76 72.3595 427.937 72.1824 428.104 71.9845C428.255 71.8231 428.411 71.6616 428.568 71.495C428.734 71.3075 428.896 71.1252 429.062 70.9585C429.219 70.7866 429.365 70.6199 429.521 70.4481C429.682 70.2814 429.828 70.1095 429.984 69.9429C430.135 69.7762 430.292 69.6148 430.427 69.4533C430.578 69.2866 430.734 69.1147 430.87 68.9481C431.031 68.7866 431.167 68.6408 431.302 68.4793C431.443 68.3127 431.588 68.1616 431.729 68.0054C431.865 67.8439 432.01 67.6825 432.141 67.5262C432.276 67.3856 432.417 67.2293 432.542 67.0783C432.682 66.9168 432.812 66.771 432.937 66.6199C433.068 66.4689 433.193 66.3231 433.323 66.172C433.448 66.0314 433.578 65.8856 433.698 65.745C433.823 65.5939 433.943 65.4481 434.057 65.3075C434.187 65.1668 434.307 65.0262 434.411 64.8908C434.531 64.7502 434.641 64.6095 434.76 64.4793C434.875 64.3439 434.984 64.2033 435.104 64.0627C435.213 63.9325 435.307 63.8127 435.406 63.6772C435.526 63.547 435.625 63.4064 435.745 63.2762C435.833 63.1564 435.927 63.0366 436.016 62.9064C436.125 62.7918 436.224 62.6616 436.323 62.5314C436.422 62.4116 436.51 62.2918 436.599 62.1825C436.687 62.0522 436.786 61.9325 436.875 61.8127C436.963 61.7033 437.042 61.5939 437.13 61.4741C437.219 61.3648 437.297 61.2554 437.375 61.1356C437.464 61.0262 437.531 60.9168 437.615 60.8179C437.693 60.7085 437.76 60.5991 437.839 60.4897C437.906 60.3804 437.974 60.2814 438.047 60.1929C438.125 60.0835 438.182 59.9741 438.25 59.8752C438.323 59.7866 438.38 59.6981 438.437 59.6043C438.5 59.495 438.568 59.4064 438.625 59.3074C438.682 59.2293 438.734 59.1304 438.781 59.047C438.844 58.9585 438.891 58.8595 438.953 58.7814C438.99 58.6981 439.042 58.6096 439.078 58.5418C439.13 58.4533 439.177 58.3647 439.219 58.2814C439.255 58.2137 439.307 58.1356 439.323 58.0627C439.375 57.9845 439.401 57.9064 439.443 57.8231C439.474 57.7658 439.51 57.6981 439.521 57.6252C439.562 57.5574 439.588 57.4846 439.62 57.4064C439.641 57.3491 439.661 57.2866 439.677 57.2398C439.708 57.1564 439.719 57.0887 439.74 57.021C439.755 56.9793 439.766 56.9272 439.776 56.8804C439.786 56.8127 439.797 56.7397 439.807 56.6825C439.807 56.6408 439.818 56.6095 439.818 56.5731C439.828 56.4741 439.828 56.3908 439.818 56.3022C439.797 56.2241 439.776 56.146 439.755 56.0835C439.75 56.0627 439.719 56.0418 439.708 56.0262C439.687 55.9845 439.667 55.9429 439.641 55.9064C439.62 55.896 439.588 55.8856 439.573 55.8647C439.552 55.8335 439.51 55.8179 439.474 55.7971C439.453 55.7866 439.422 55.7866 439.385 55.7658C439.354 55.7554 439.307 55.745 439.266 55.7241H439.01C438.969 55.7241 438.911 55.7449 438.87 55.7449C438.812 55.7554 438.766 55.7658 438.703 55.7866C438.646 55.7866 438.588 55.8075 438.547 55.8179C438.479 55.8335 438.417 55.8543 438.338 55.8856C438.292 55.896 438.234 55.9273 438.161 55.9325C438.094 55.9637 438.026 55.995 437.958 56.0366C437.885 56.0522 437.818 56.0835 437.75 56.1252C437.672 56.1512 437.583 56.1929 437.505 56.2346C437.427 56.2606 437.354 56.3023 437.286 56.3335C437.198 56.3908 437.109 56.4325 437.021 56.4845C436.932 56.5314 436.854 56.5731 436.776 56.6095C436.687 56.672 436.588 56.7293 436.479 56.7814C436.401 56.8387 436.312 56.8804 436.224 56.9377C436.125 57.0106 436.016 57.0679 435.911 57.1304C435.823 57.1877 435.724 57.2502 435.625 57.3074C435.526 57.3856 435.406 57.4585 435.302 57.5262C435.203 57.5939 435.104 57.6564 435.005 57.7241C434.875 57.8075 434.76 57.896 434.641 57.9741C434.531 58.0418 434.432 58.1148 434.323 58.1929C434.198 58.271 434.068 58.37 433.932 58.4741C433.833 58.5418 433.724 58.6199 433.609 58.6981L433.193 59.0002C433.083 59.0887 432.979 59.1564 432.859 59.2554C432.724 59.3595 432.562 59.4689 432.417 59.5835C432.297 59.6773 432.182 59.7658 432.062 59.8439C431.917 59.9741 431.745 60.0939 431.589 60.2137C431.479 60.3127 431.365 60.3908 431.234 60.4897C431.068 60.62 430.901 60.7606 430.713 60.9012C430.604 60.9898 430.5 61.0783 430.37 61.1668C430.193 61.3075 430.005 61.4689 429.818 61.6147C429.698 61.7033 429.594 61.8022 429.463 61.896C429.266 62.0627 429.052 62.245 428.833 62.4116C428.734 62.4898 428.635 62.5783 428.542 62.6616C427.901 63.1772 427.24 63.7241 426.562 64.2918C426.443 64.4012 426.323 64.4897 426.219 64.5887C425.99 64.7918 425.766 64.9793 425.526 65.1772C425.38 65.3074 425.245 65.4168 425.094 65.547C424.88 65.7241 424.661 65.9116 424.448 66.1043C424.297 66.2345 424.161 66.3491 424.01 66.4689C423.786 66.672 423.568 66.8491 423.354 67.047C423.187 67.1876 423.026 67.3283 422.87 67.4741C422.646 67.6564 422.437 67.8543 422.224 68.0314C422.052 68.1824 421.875 68.3387 421.698 68.4793C421.495 68.6772 421.276 68.8699 421.062 69.0574C420.885 69.2189 420.708 69.3647 420.531 69.5366C420.312 69.7241 420.088 69.922 419.87 70.1147C419.682 70.2814 419.505 70.4429 419.328 70.5991C419.104 70.797 418.875 71.0001 418.651 71.2085C418.464 71.3647 418.276 71.547 418.078 71.7033C417.854 71.9116 417.635 72.12 417.401 72.3231C417.214 72.4897 417.026 72.6616 416.839 72.8387C416.594 73.0574 416.354 73.2658 416.109 73.495C415.932 73.6564 415.745 73.8231 415.568 73.9897C415.312 74.2189 415.068 74.4481 414.823 74.6668C414.625 74.8595 414.427 75.0262 414.229 75.2085C413.995 75.4272 413.76 75.646 413.51 75.8752C413.307 76.0522 413.099 76.2502 412.891 76.4377C412.656 76.6564 412.411 76.8752 412.167 77.1043C411.958 77.3075 411.74 77.495 411.536 77.6929C411.276 77.922 411.031 78.1616 410.776 78.4012C410.578 78.5783 410.375 78.7658 410.177 78.9481C409.911 79.2033 409.625 79.4533 409.359 79.7137C409.161 79.8908 408.963 80.0731 408.771 80.271C408.495 80.521 408.219 80.7762 407.943 81.0366C407.745 81.2241 407.547 81.4064 407.344 81.5939C407.057 81.8595 406.76 82.1303 406.484 82.4116C406.292 82.5887 406.094 82.7658 405.906 82.9585C405.599 83.2345 405.307 83.5054 405.01 83.7918C404.812 83.9689 404.625 84.1512 404.437 84.3283C404.104 84.6356 403.771 84.9585 403.448 85.2762C403.286 85.4116 403.12 85.5731 402.974 85.7241C402.578 86.0887 402.187 86.4585 401.802 86.8387C401.682 86.9376 401.578 87.0366 401.469 87.146C401.036 87.5522 400.599 87.9689 400.156 88.3908C400.089 88.4585 400.01 88.5262 399.943 88.6095C398.911 89.5835 397.875 90.5783 396.823 91.5939C396.724 91.6824 396.625 91.771 396.536 91.8699C396.104 92.2762 395.682 92.6876 395.25 93.0939C395.12 93.2241 394.995 93.3439 394.854 93.4741C394.453 93.8699 394.047 94.2501 393.646 94.6564C393.526 94.7658 393.406 94.8856 393.292 94.9949C392.875 95.4012 392.464 95.7918 392.042 96.1981C391.891 96.3387 391.745 96.4845 391.599 96.6356C391.214 97.0054 390.828 97.3699 390.448 97.7501C390.281 97.9116 390.099 98.0887 389.932 98.2501C389.562 98.6043 389.177 98.9741 388.802 99.3439C388.635 99.5001 388.458 99.672 388.292 99.8387C387.927 100.198 387.562 100.557 387.187 100.917C386.99 101.104 386.807 101.292 386.609 101.479C386.245 101.828 385.891 102.188 385.526 102.547C385.339 102.724 385.151 102.906 384.964 103.094C384.599 103.443 384.234 103.807 383.875 104.167C383.687 104.349 383.51 104.526 383.323 104.693C382.937 105.073 382.562 105.453 382.182 105.818C382.005 105.99 381.828 106.167 381.656 106.344C381.266 106.714 380.901 107.094 380.516 107.458C380.318 107.641 380.141 107.828 379.958 108.016H379.953Z"
                stroke="#25272E"
                class="dark:!stroke-zinc-700"
                stroke-width="3.95787"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M291.25 200.083C291.25 200.083 302.63 194.594 305 189.557C307.37 184.536 296.271 186.943 291.25 200.083Z"
                class="fill-zinc-50"
              />
              <g>
                <mask
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="289"
                  y="184"
                  width="19"
                  height="19"
                >
                  <g>
                    <path
                      d="M289.099 184.333H307.333V202.313H289.099V184.333Z"
                      class="fill-zinc-50"
                    />
                  </g>
                </mask>
                <g mask="url(#mask1_14_2)">
                  <g>
                    <path
                      d="M291.25 200.083C291.25 200.083 302.63 194.594 305 189.557C307.37 184.537 296.271 186.943 291.25 200.083Z"
                      stroke="#25272E"
                      class="dark:!stroke-zinc-700"
                      stroke-width="3.95787"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
              </g>
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M49.9375 119.52C46.4375 119.52 43.5 119.229 41.125 118.645C38.7604 118.062 36.8229 117.099 35.3125 115.75C33.7969 114.39 32.7083 112.64 32.0417 110.5C31.3854 108.364 31.0625 105.703 31.0625 102.52V100.312H30.6042C29.5208 103.411 27.7135 105.802 25.1875 107.479C22.6563 109.145 19.5729 109.979 15.9375 109.979C11.0469 109.979 7.23958 108.661 4.52083 106.02C1.79687 103.385 0.4375 99.6975 0.4375 94.9579C0.4375 92.7808 0.760416 90.8017 1.41667 89.0204C2.08333 87.2287 3.13021 85.4996 4.5625 83.8329C6.00521 82.1662 7.89583 80.4996 10.2292 78.8329C12.5625 77.1558 15.3958 75.3485 18.7292 73.4162L30.6042 66.6662V59.4371H36.4167V101.812C36.4167 105.786 37.3646 108.552 39.2708 110.104C41.1719 111.645 44.026 112.416 47.8333 112.416H51.7917V117.666L49.9375 119.52ZM16.8542 102.75C21.7552 102.75 25.2708 101.916 27.3958 100.25C29.5313 98.5829 30.6042 95.7287 30.6042 91.6871V73.2912L19.6667 79.3537C17.25 80.6767 15.1875 81.9162 13.4792 83.0829C11.7708 84.2392 10.3854 85.3954 9.33333 86.5621C8.29167 87.7287 7.52083 88.9371 7.02083 90.1871C6.52083 91.4267 6.27083 92.7808 6.27083 94.2496C6.27083 99.9162 9.79687 102.75 16.8542 102.75Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M49.9411 114.27L51.7952 112.416H63.7952V117.666L61.9202 119.52H49.9411V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M61.9344 114.27L63.7886 112.416H75.7886V117.666L73.9136 119.52H61.9344V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M73.9278 114.27L75.7819 112.416H87.7819V117.666L85.9069 119.52H73.9278V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M85.9211 114.27L87.7753 112.416H99.7753V117.666L97.9003 119.52H85.9211V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M97.9145 114.27L99.7686 112.416H111.769V117.666L109.894 119.52H97.9145V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M109.908 114.27L111.762 112.416H123.762V117.666L121.887 119.52H109.908V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M121.901 114.27L123.755 112.416H135.755V117.666L133.88 119.52H121.901V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M133.895 114.27L135.749 112.416H138.665C140.374 112.416 141.884 112.265 143.207 111.958C144.525 111.64 145.728 111.114 146.811 110.375C147.895 109.64 148.879 108.635 149.77 107.354C150.671 106.078 151.587 104.51 152.52 102.645L158.686 90.5204L163.457 92.9787L157.061 105.437C156.905 105.828 156.733 106.177 156.54 106.479C156.342 106.786 156.129 107.135 155.895 107.52L158.561 109.166C161.197 110.791 163.738 111.974 166.186 112.708C168.645 113.447 171.108 113.812 173.582 113.812C177.775 113.812 180.842 112.828 182.79 110.854C184.733 108.869 185.707 105.432 185.707 100.541V90.5204H191.52V100.541C191.52 105.125 192.197 108.489 193.561 110.625C194.921 112.75 197.27 113.812 200.603 113.812H202.707C205.801 113.812 208.108 112.75 209.624 110.625C211.134 108.489 211.895 105.125 211.895 100.541V85.8746H217.728V100.541C217.728 108.458 221.566 112.416 229.249 112.416H232.624V117.666L230.77 119.52C225.712 119.52 221.79 118.729 218.999 117.145C216.207 115.552 214.27 113 213.186 109.5H212.707C212.092 113.458 210.796 116.354 208.811 118.187C206.837 120.005 204.061 120.916 200.478 120.916C196.52 120.916 193.415 119.947 191.165 118.02C188.915 116.078 187.441 113.281 186.749 109.625H186.165C184.691 117.156 180.072 120.916 172.311 120.916C167.186 120.916 161.79 119.093 156.124 115.437L152.165 113C149.999 115.489 147.509 117.197 144.707 118.125C141.915 119.057 138.311 119.52 133.895 119.52V114.27ZM195.603 76.2079C192.879 76.2079 191.52 74.6975 191.52 71.6662C191.52 68.7235 192.879 67.2496 195.603 67.2496H196.52C197.686 67.2496 198.655 67.5985 199.436 68.2912C200.212 68.9892 200.603 70.1142 200.603 71.6662C200.603 73.2235 200.212 74.3694 199.436 75.1037C198.655 75.8433 197.686 76.2079 196.52 76.2079H195.603ZM180.686 76.2079C179.447 76.2079 178.462 75.8433 177.728 75.1037C176.988 74.3694 176.624 73.2235 176.624 71.6662C176.624 70.1142 176.988 68.9892 177.728 68.2912C178.462 67.5985 179.447 67.2496 180.686 67.2496H181.624C182.858 67.2496 183.842 67.5985 184.582 68.2912C185.332 68.9892 185.707 70.1142 185.707 71.6662C185.707 73.2235 185.332 74.3694 184.582 75.1037C183.842 75.8433 182.858 76.2079 181.624 76.2079H180.686ZM188.02 61.9996C186.936 61.9996 186.025 61.6558 185.29 60.9579C184.551 60.2652 184.186 59.1767 184.186 57.6871C184.186 56.2183 184.551 55.1558 185.29 54.4996C186.025 53.8329 186.936 53.4996 188.02 53.4996H189.082C190.249 53.4996 191.197 53.8329 191.936 54.4996C192.671 55.1558 193.04 56.2183 193.04 57.6871C193.04 59.1767 192.671 60.2652 191.936 60.9579C191.197 61.6558 190.249 61.9996 189.082 61.9996H188.02Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M230.773 114.27L232.627 112.416H244.627V117.666L242.752 119.52H230.773V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M242.766 114.27L244.62 112.416H256.62V117.666L254.745 119.52H242.766V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M254.759 114.27L256.613 112.416H268.613V117.666L266.738 119.52H254.759V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M266.753 114.27L268.607 112.416H280.607V117.666L278.732 119.52H266.753V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M278.746 114.27L280.6 112.416H292.6V117.666L290.725 119.52H278.746V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M290.739 114.27L292.593 112.416H304.593V117.666L302.718 119.52H290.739V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M302.733 114.27L304.587 112.416H316.587V117.666L314.712 119.52H302.733V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M314.726 114.27L316.58 112.416H328.58V117.666L326.705 119.52H314.726V114.27Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M268.375 162.177L268.333 162.813C268.13 164.094 267.531 165.12 266.531 165.891C265.526 166.661 264.339 166.979 262.969 166.839C261.667 166.646 260.62 166.057 259.828 165.073C259.578 164.76 259.37 164.411 259.208 164.036L259 163.464C258.885 163.063 258.828 162.651 258.823 162.219C258.849 160.891 259.312 159.786 260.208 158.901C261.104 158.016 262.224 157.552 263.578 157.51C264.932 157.542 266.057 157.995 266.964 158.87C267.865 159.75 268.333 160.849 268.375 162.177Z"
              />
              <path
                class="fill-zinc-800 dark:fill-zinc-50"
                d="M286.036 162.177L285.995 162.813C285.792 164.094 285.193 165.12 284.193 165.891C283.188 166.661 282 166.979 280.63 166.839C279.323 166.646 278.276 166.057 277.49 165.073C277.24 164.76 277.031 164.411 276.865 164.036L276.656 163.464C276.547 163.063 276.484 162.651 276.484 162.219C276.51 160.891 276.974 159.786 277.865 158.901C278.76 158.016 279.885 157.552 281.24 157.51C282.589 157.542 283.719 157.995 284.62 158.87C285.521 159.75 285.995 160.849 286.036 162.177Z"
              />
            </g>
          </g>
        </svg>
        <div />
        <div
          class="
        flex flex-col gap-1 items-center"
        >
          <h1
            class="
            font-semibold
            text-2xl mb-3"
          >
            {localStorage.lang === "en" ? "Pages" : "الصفحات"}
          </h1>
          <a href="/">
            {localStorage.lang === "en" ? "Home Page" : "الرئيسية"}
          </a>
          <a href="/about">
            {localStorage.lang === "en" ? "About Us" : "عننا"}
          </a>
          {!withoutLoginPage &&
            (!isLoggedIn() ? (
              <a href="/login">
                {localStorage.lang === "en" ? "Login" : "تسجيل الدخول"}
              </a>
            ) : (
              <a href="/documents">
                {localStorage.lang === "en" ? "My Documents" : "مستنداتي"}
              </a>
            ))}
        </div>
      </footer>
    </>
  );
}