
const cars = [];

class Cars {
    constructor(car){
        this.name = car.name;
        this.imageUrl = car.images
    }

    static saveImage(images){
        const img = [];
        if(images.length !== 0) {
            images.forEach(element => {
                img.push(element)
            });
        }
        return img;
    }
    static saveCar(car){
        cars.push(car);
        
    }

    static getCars(){
        return cars;
    }

}