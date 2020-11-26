/**
 * @return {string}
 */
export function ReturnColor(temperature){
    if(temperature < 3700){
        return '#F12F26'
    }
    if(temperature >= 3700 && temperature < 5200){
        return '#F77526'
    }
    if(temperature >= 5200 && temperature < 6000){
        return '#FAFF52'
    }
    if(temperature >= 6000 && temperature < 7500){
        return '#F5FAB7'
    }
    if(temperature >= 7500 && temperature < 10000){
        return '#FFFFFF'
    }
    if(temperature >= 10000 && temperature < 33000){
        return '#C2E9FC'
    }
    if(temperature >= 33000){
        return '#289DFF'
    }
}
